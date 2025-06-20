
async function mainhotm(){
    await loadhotm()
    await load_powder()
    await loadpeakofthemountain()
    await loadpickaxeability()
    await show_tier_exp()
    await loadCommision()
}


let hotm;
async function loadhotm(){
    hotm = allapi.profiles[0].members.aa3e247ff9d2418eaadc949c77aafc7d.mining_core
}
async function load_powder(){
    let powder_mithril = hotm.powder_mithril
    document.getElementById('powder_mithril').innerText="mithril powder : "+formatNombre(powder_mithril)

    let powder_gemstone = hotm.powder_gemstone
    document.getElementById('powder_gemstone').innerText="gemstone powder : "+formatNombre(powder_gemstone)

    let powder_glacite = hotm.powder_glacite
    document.getElementById('powder_glacite').innerText="glacite powder : "+formatNombre(powder_glacite)

}
let peak_of_the_mountain
async function loadpeakofthemountain() {
    peak_of_the_mountain = hotm.nodes.special_0
    document.getElementById('peak_of_the_mountain').innerText="peak of the mountain token : "+formatNombre(peak_of_the_mountain)

}
let pickaxe_ability
async function loadpickaxeability() {
    pickaxe_ability = hotm.selected_pickaxe_ability 
    if(pickaxe_ability==undefined){pickaxe_ability="none"}
    document.getElementById('pickaxe ability').innerText="pickaxe ability : "+formatNombre(pickaxe_ability)

}
let tierhotm = [
    [1, 0],
    [2, 3000],
    [3, 9000],
    [4, 25000],
    [5, 60000],
    [6, 100000],
    [7, 150000],
    [8, 210000],
    [9, 290000],
    [10, 400000]
]
async function show_tier_exp() {
    let tmp = hotm.experience
    for (let i = 0; i < tierhotm.length; i++) {
        if (tmp - tierhotm[i][1] < 0) {
            document.getElementById("tier").innerText = "tier hotm :"+(tierhotm[i][0]-1)
            document.getElementById("xptier").innerText="experience :"+formatNombre(tmp)+"/"+formatNombre(tierhotm[i][1])
            break
        } else {
            tmp -= tierhotm[i][1]
        }
    }
}
//-------------- commisions

let objectiv;
async function loadCommision() {
    objectiv = allapi.profiles[0].members["aa3e247ff9d2418eaadc949c77aafc7d"].objectives
    await transformerObjectivesEnTableau(objectiv)
    await load_quest()
}


let objectivtab;
async function transformerObjectivesEnTableau(objectives) {
  objectivtab = Object.entries(objectives)
    .filter(([_, val]) => typeof val === "object" && val !== null) // ignore les []
    .map(([key, val]) => ({
      name: key,
      status: val.status || null,
      progress: val.progress || null,
      completed_at: val.completed_at || null
    }));
}

let tabcompleted = [];
let othertab = [];
function test() {
  let tab = objectivtab;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].status === "COMPLETE") {
      tabcompleted.push(tab[i]);
    } else {
      othertab.push(tab[i]);
    }
  }
}

let completed_quest 
let other_quest
let riftquest
let fetchur_quest
let talk_quest
let progress_valid
let progress_invalid 
async function load_quest(){
  completed_quest = objectivtab.filter(obj => obj.status === "COMPLETE" && 
                                              !obj.name.includes("talk") &&
                                              !obj.name.includes("fetchur") &&
                                              !obj.name.includes("rift"));

  riftquest = objectivtab.filter(obj => obj.name.includes("rift"));

  other_quest = objectivtab.filter(obj => obj.status !== "COMPLETE" && 
                                        !obj.name.includes("rift") &&
                                        !obj.name.includes("fetchur") &&
                                        !obj.name.includes("talk"));
                                        
  fetchur_quest = objectivtab.filter(obj => obj.name.includes("fetchur"));
  talk_quest = objectivtab.filter(obj => obj.name.includes("talk"));

  progress_invalid = objectivtab.filter(obj => obj.progress === null);
progress_valid = objectivtab.filter(obj => obj.progress !== null);


}

