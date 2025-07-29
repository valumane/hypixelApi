function cleanNameForWiki(name) {
    return name.replace(/§./g, "").replace(/ /g, "_");
}

async function getItemImageUrl(itemName) {
    const formattedName = cleanNameForWiki(itemName);
    const wikiUrl = `https://wiki.hypixel.net/${formattedName}`;

    try {
        const response = await fetch(wikiUrl);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const imgUrl = doc
            .getElementsByTagName("tbody")[1]
            ?.children[1]
            ?.children[0]
            ?.children[0]
            ?.src;

        return imgUrl || null;
    } catch (error) {
        console.warn(`Image not found for ${itemName}`, error);
        return null;
    }
}




