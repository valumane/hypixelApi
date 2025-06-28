
async function mainhotm() {
  await load_hotm()
  await load_powder()
  await load_crystal()
  await load_forge()
}


let hotm;
async function load_hotm() {
  hotm = allapi.profiles[0].members.aa3e247ff9d2418eaadc949c77aafc7d.mining_core
}
async function load_powder() {
  let powder_mithril = hotm.powder_mithril
  document.getElementById('powder_mithril').innerText = "mithril powder : " + formatNombre(powder_mithril)

  let powder_gemstone = hotm.powder_gemstone
  document.getElementById('powder_gemstone').innerText = "gemstone powder : " + formatNombre(powder_gemstone)

  let powder_glacite = hotm.powder_glacite
  document.getElementById('powder_glacite').innerText = "glacite powder : " + formatNombre(powder_glacite)

}

let crystal;
let crystal_list = []
async function load_crystal() {
  crystal = hotm.crystals
  let crystal_list_name = ["amber_crystal", "amethyst_crystal", "jade_crystal", "jasper_crystal", "ruby_crystal", "sapphire_crystal", "topaz_crystal"]
  for (let i = 0; i < crystal_list_name.length; i++) {
    let crystal_name = crystal_list_name[i]
    let crystal_state = crystal[crystal_name].state
    let crystal_total_found = crystal[crystal_name].total_found
    let crystal_total_placed = crystal[crystal_name].total_placed

    let sub_list = [crystal_name, crystal_state, crystal_total_found, crystal_total_placed]
    crystal_list.push(sub_list)

    let crystal_div = document.getElementById("crystal_label")
    let sub_div = document.createElement("p")
    sub_div.className = "sub_crystal"
    sub_div.innerText = crystal_name + ", state : " + crystal_state + ", found : " + crystal_total_found + ", placed : " + crystal_total_placed
    //<p class="sub_crystal"> amber_crystal, not found, found : n, placed : n </p>
    crystal_div.after(sub_div)
  }
}


let forge
async function load_forge() {
  forge = allapi.profiles[0].members.aa3e247ff9d2418eaadc949c77aafc7d.forge.forge_processes.forge_1
  let forge_div = document.getElementById("forge_label")
  let sub_div = document.createElement("p")
  sub_div.className = "sub_forge"


  if (Object.keys(forge).length === 0) {
    console.log("truc")
    document.getElementById("forge_label").innerText = "forge empty"
  } else {
    for (let i = 1; i < 6; i++) {
      if (forge[i] == undefined) {

      } else {
        let name = forge[i].id
        let started_time = convertirTempsUnix(forge[i].startTime)

        sub_div.innerText = "slot : " + forge[i].slot + ", " + name + ", " + started_time
        forge_div.after(sub_div)

      }
    }
  }
}