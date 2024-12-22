var farmingCollection;
var miningCollection;
var combatCollection;
var foragingCollection;
var fishingCollection;
var riftCollection;


function getItems(catname,name,catcat){
    const items=catcat[name]    
    const Temp = sumAllTiers(items.tiers);
    const itemsCollected = allCollected[name]
    
    

    var cpt=0;
    for(i=0;i<items.tiers.length;i++){
        if(itemsCollected > items.tiers[i].amountRequired){
            cpt++
        }
    }
    var cptTemp = cpt;

    if(cpt=items.tiers.length && itemsCollected>Temp || cptTemp==items.tiers.length){

        createFarmingdiv(catname,items.name,"100%","collected:"+itemsCollected,cptTemp)
    } else {
        var eta = Math.round((itemsCollected/items.tiers[cptTemp].amountRequired)*100)
        createFarmingdiv(catname,items.name,eta+"%",itemsCollected +"/"+items.tiers[cptTemp].amountRequired,cptTemp)

        
    }
} 

var categories;
function getAllFarming(){
    farmingcategories = Object.keys(farmingCollection);
    miningcategories = Object.keys(miningCollection);
    combatcategories = Object.keys(combatCollection);
    foragingcategories = Object.keys(foragingCollection);
    fishingcategories = Object.keys(fishingCollection);
    riftcategories = Object.keys(riftCollection);



    for(j=0;j < farmingcategories.length ; j++){
        getItems("farming",farmingcategories[j],farmingCollection);
    }
    

    for(a=0;a < miningcategories.length ; a++){
        getItems("mining",miningcategories[a],miningCollection);
    }
 
    for(b=0;b < combatcategories.length ; b++){
        getItems("combat",combatcategories[b],combatCollection);
    }

    for(c=0;c < foragingcategories.length ; c++){
        getItems("foraging",foragingcategories[c],foragingCollection);
    }

    for(d=0;d < fishingcategories.length ; d++){
        getItems("fishing",fishingcategories[d],fishingCollection);
    }
    for(e=0;e < riftcategories.length ; e++){
        getItems("rift",riftcategories[e],riftCollection);
    }

}



