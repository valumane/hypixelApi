import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

// Conteneur pour tous les liens
let allLinks = [];

// Fonction principale de scraping
async function scrapSiteMap(wikiUrl, nPage = 1) {
  console.log(`📖 Scraping page ${nPage}: ${wikiUrl}`);

  try {
    const response = await fetch(wikiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept": "text/html",
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Récupérer les liens de cette page
    const ul = doc.getElementsByClassName("mw-allpages-chunk")[0];
    if (ul) {
      for (let i = 0; i < ul.children.length; i++) {
        const href = ul.children[i]?.children[0]?.href;
        if (!href) continue;

        const fullUrl = 'https://wiki.hypixel.net' + href;
        allLinks.push(fullUrl);
      }
    }

    // Pagination
    const nextdiv = doc.getElementsByClassName("mw-allpages-nav")[0];
    if (!nextdiv) {
      console.log(`✅ Pas de navigation trouvée. Fin du scraping.`);
      return;
    }

    let nextbutton;
    if (nextdiv.children.length === 1) {
      if (nextdiv.children[0]?.textContent?.trim()[0] === "P") {
        console.log(`Dernière page atteinte !`);
        return;
      }
      nextbutton = nextdiv.children[0]?.href;
    } else if (nextdiv.children.length > 1) {
      nextbutton = nextdiv.children[1]?.href;
    }

    if (nextbutton) {
      const nextUrl = "https://wiki.hypixel.net" + nextbutton;
      await new Promise(res => setTimeout(res, 10));  // Petit delay
      await scrapSiteMap(nextUrl, nPage + 1);
    } else {
      console.log(`Aucune page suivante trouvée. Fin du scraping.`);
    }

  } catch (error) {
    console.error(`Error on page ${nPage}:`, error);
  }
}

// Exécution du scraper
(async () => {
  await scrapSiteMap("https://wiki.hypixel.net/index.php?title=Special:AllPages");

  // Sauvegarde des résultats
  fs.writeFileSync('./sitemap/sitemap.json', JSON.stringify(allLinks, null, 2));
  console.log(`✅ Sitemap saved to sitemap.json with ${allLinks.length} entries.`);
})();
