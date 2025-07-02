import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

// fonction qui essaye d'extraire l'image d'une page
async function getItemImageFromUrl(pageUrl) {
  console.log(`🔎 Checking: ${pageUrl}`);
  try {
    const response = await fetch(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html",
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ HTTP error! status: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const tbody = doc.getElementsByTagName("tbody")[1];
    const imgUrl = tbody?.children[1]?.children[0]?.children[0]?.src || null;

    if (!imgUrl) return null;

    return imgUrl.startsWith('http') ? imgUrl : 'https://wiki.hypixel.net' + imgUrl;
  } catch (error) {
    console.warn(`❌ Error fetching ${pageUrl}:`, error);
    return null;
  }
}

async function processAllItems() {
  const sitemap = JSON.parse(fs.readFileSync('sitemap.json', 'utf8'));

  const success = [];
  const fail = [];

  for (let i = 0; i < sitemap.length; i++) {
  const pageUrl = sitemap[i];
  const imgLink = await getItemImageFromUrl(pageUrl);

  if (imgLink) {
      console.log(`✅ FOUND: ${imgLink}`);
      success.push({
        url: pageUrl,
        imglink: imgLink
      });
    } else {
      console.log(`❌ No image found for: ${pageUrl}`);
      fail.push(pageUrl);
    }

  //Progress log
  const remaining = sitemap.length - (i + 1);
  const estimatedTimeSec = (remaining * 0.3).toFixed(0);
  console.log(`⏳ Progress: ${i + 1}/${sitemap.length} (~${estimatedTimeSec}s left)`);

  //Anti-DDOS polite delay
  await new Promise(res => setTimeout(res, 250));
}

  fs.writeFileSync('success.json', JSON.stringify(success, null, 2));
  fs.writeFileSync('fail.json', JSON.stringify(fail, null, 2));

  console.log(`\n✅ DONE! Saved ${success.length} successes and ${fail.length} fails.`);
}

processAllItems();
