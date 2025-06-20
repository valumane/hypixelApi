var farmingCollection;
var miningCollection;
var combatCollection;
var foragingCollection;
var fishingCollection;
var riftCollection;

let collectionCol

function getItems(catname, name, catcat) {
    const items = catcat[name]
    const Temp = sumAllTiers(items.tiers);
    const itemsCollected = allCollected[name]

    var cpt = 0;
    for (i = 0; i < items.tiers.length; i++) {
        if (itemsCollected > items.tiers[i].amountRequired) {
            cpt++
        }
    }
    var cptTemp = cpt;

    if (cpt = items.tiers.length && itemsCollected > Temp || cptTemp == items.tiers.length) {
        createFarmingdiv(catname, items.name, "100%", "collected:" + formatNombre(itemsCollected), cptTemp)
    } else {
        var eta = Math.round((itemsCollected / items.tiers[cptTemp].amountRequired) * 100)
        createFarmingdiv(catname, items.name, eta + "%", itemsCollected + "/" + items.tiers[cptTemp].amountRequired, cptTemp)
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



