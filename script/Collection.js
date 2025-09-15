var farmingCollection;
var miningCollection;
var combatCollection;
var foragingCollection;
var fishingCollection;
var riftCollection;

let collectionCol

function getItems(catname, name, catcat) {
    const items = catcat[name];
    const collected = allCollected?.[name];
    const itemsCollected = Number.isFinite(collected) ? Math.max(0, collected) : 0;

    let tier = 0;
    while (tier < items.tiers.length && itemsCollected >= items.tiers[tier].amountRequired) {
        tier++;
    }

    if (tier === items.tiers.length) {
        createFarmingdiv(catname, items.name, "100%", "collected:" + formatNombre(itemsCollected), tier);
    } else {
        const target = items.tiers[tier].amountRequired;
        // Reserve 100% for a completed collection, even just below a threshold.
        const eta = Math.min(99, Math.round((itemsCollected / target) * 100));
        createFarmingdiv(catname, items.name, eta + "%", itemsCollected + "/" + target, tier);
    }
}

var categories;
async function getAllFarming() {
    collectionCol=[
        { name: "farming", data: farmingCollection },
        { name: "mining", data: miningCollection },
        { name: "combat", data: combatCollection },
        { name: "foraging", data: foragingCollection },
        { name: "fishing", data: fishingCollection },
        { name: "rift", data: riftCollection }
    ];

    for (let i = 0; i < collectionCol.length; i++) {
        let cat = Object.keys(collectionCol[i].data);
        for (let j = 0; j < cat.length; j++) {
            getItems(collectionCol[i].name, cat[j], collectionCol[i].data);
        }
    }

}



