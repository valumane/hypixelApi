
async function mainhotm(){
    await loadhotm()
    await loadpowdercrystal()
}


let hotm;
async function loadhotm(){
    hotm = allapi.profiles[0].members.aa3e247ff9d2418eaadc949c77aafc7d.mining_core
}


let powder_mithril
async function loadpowdercrystal(){
    powder_mithril = hotm.powder_mithril
    document.getElementById('powder_mithril').innerText="mithril powder : "+formatNombre(powder_mithril)
}
