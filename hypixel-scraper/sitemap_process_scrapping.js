import path from 'path';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

// Option : fichier à traiter
const inputFile = './sitemap/sitemap.json';

// ✅ Delay pour éviter de se faire flag
const DELAY_MS = 100;

// ✅ Fonctions utilitaires pour append
function appendJsonLine(file, obj) {
    fs.appendFileSync(file, JSON.stringify(obj) + '\n');
}

let imglinktmp
let categorietmp
let did_everything_done = false

// ✅ Fonction pour récupérer l'image sur une page
async function getItemImageFromUrl(pageUrl) {
    try {
        console.log(`🔎 Checking: ${pageUrl}`);
        const response = await fetch(pageUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html",
                "Accept-Language": "en-US,en;q=0.9",

            }
        });

        if (!response.ok) {
            console.log(new Error(`❌ HTTP error! status: ${response.status}`));
            return 403
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const tbody0 = doc.getElementsByTagName("tbody")[0];
        const tbody1 = doc.getElementsByTagName("tbody")[1];

        const imgUrl = tbody0?.children[1]?.children[0]?.children[0]?.src ||
            tbody1?.children[1]?.children[0]?.children[0]?.src ||
            tbody1?.children[0]?.children[0]?.children[0]?.src
            


        const categorie = tbody0?.children[3]?.children[1]?.children[0]?.title ||
            tbody0?.children[2]?.children[1]?.children[0]?.title ||
            tbody1?.children[3]?.children[1]?.children[0]?.title

        console.log("🔲", categorie)
        console.log("🖼️:", imgUrl);

        categorietmp = categorie ? categorie.replace('Category:', '') : null;

        if (!imgUrl) imglinktmp = null;

        imglinktmp = imgUrl.startsWith('http') ? imgUrl : 'https://wiki.hypixel.net' + imgUrl;
    } catch (error) {
        console.warn(`❌ Error on ${pageUrl}:`);
        imglinktmp = null;
    }
}

// ✅ Lecture des URLs restantes en reprenant proprement
function loadRemaining(inputList, successFile, failFile) {
    let alreadyDone = new Set();

    try {
        const successLines = fs.readFileSync(successFile, 'utf8').split('\n').filter(Boolean);
        for (const line of successLines) {
            const obj = JSON.parse(line);
            if (obj?.url) alreadyDone.add(obj.url);
        }
        console.log(`✅ Loaded ${alreadyDone.size} entries from ${successFile}`);
    } catch {
        console.log(`ℹ️ No existing success file, starting fresh`);
    }

    try {
        const failLines = fs.readFileSync(failFile, 'utf8').split('\n').filter(Boolean);
        for (const line of failLines) {
            const obj = JSON.parse(line);
            if (obj?.url) alreadyDone.add(obj.url);
        }
        console.log(`✅ Loaded ${alreadyDone.size} total entries including ${failFile}`);
    } catch {
        console.log(`ℹ️ No existing fail file, starting fresh`);
    }

    return inputList.filter(url => !alreadyDone.has(url));
}


// ✅ Fonction principale
async function processFile(inputFile) {
    const allUrls = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    // Récupère le dossier où est le inputFile
    const inputDir = path.dirname(inputFile);
    const baseName = path.basename(inputFile, '.json');

    // Mets les outputs dans le même dossier
    const successFile = path.join(inputDir, `${baseName}_success.ndjson`);
    const failFile = path.join(inputDir, `${baseName}_fail.ndjson`);

    // ✅ Retire déjà-traités si en mode append
    const urls = loadRemaining(allUrls, successFile, failFile);

    console.log(`✅ Remaining URLs to process: ${urls.length}`);

    // ✅ Scraping
    for (let i = 0; i < urls.length; i++) {
        const pageUrl = urls[i];

        let res = await getItemImageFromUrl(pageUrl);
        const imgLink = imglinktmp;
        const categorie = categorietmp;

        if (res == 403) { return null; }

        if (imgLink) {
            console.log(`✅ FOUND: ${imgLink}`);
            appendJsonLine(successFile, { url: pageUrl, imglink: imgLink, category: categorie });
        } else {
            console.log(`❌ No image for: ${pageUrl}`);
            appendJsonLine(failFile, { url: pageUrl, category: categorie });
        }

        console.log(`⏳ Progress: ${i + 1}/${urls.length}`);
        console.log("-----------------------");

        // Anti flag delay
        await new Promise(res => setTimeout(res, Math.round(DELAY_MS + Math.random() * 200)));
    }

    console.log(`✅ All scraping done! 🎉`);
    did_everything_done = true;
}


function waitRandom(minMs, maxMs) {
    console.log(new Date())
    const delay = minMs + Math.random() * (maxMs - minMs);
    console.log(`⏸️ Waiting for ${(delay / 60000).toFixed(2)} minutes before next batch...`);
    return new Promise(res => setTimeout(res, delay));
}


// ✅ Exécution
(async () => {
    while (!did_everything_done) {
        await processFile(inputFile);
        await waitRandom(5 * 60 * 1000, 10 * 60 * 1000);
    }
})();