async function load_inventory() {
    await get_bag()
    console.log("- get_bag loaded")

    await get_inv_contents()
    console.log("- get_inv_contents loaded")

    await get_ender_chest_contents(); console.log("- get_ender_chest_contents loaded")

    await get_inv_armor(); console.log("- get_inv_armor loaded")

    await get_equipment_contents(); console.log("- get_equipment_contents loaded")

    await get_personal_vault_contents(); console.log("- get_personal_vault_contents loaded")

    await get_wardrobe_contents(); console.log("- get_wardrobe_contents loaded")

    //await inv_armor_contents(); console.log("-- inv_armor_contents loaded")

    //gestion_inv_contents()
}

async function parseNBTData(chaine) {

    const nbt = await import("https://esm.sh/prismarine-nbt@2.2.0");
    const { Buffer } = await import("https://esm.sh/buffer@6.0.3");

    function cleanBase64(s) {
        s = s.replace(/\s/g, '');
        const padding = s.length % 4;
        return padding ? s + '='.repeat(4 - padding) : s;
    }

    // 1. Base64 → bytes
    const decoded = atob(cleanBase64(chaine));
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
    }

    // 2. Décompression gzip
    const decompressed = new DecompressionStream("gzip");
    const stream = new Response(new Blob([bytes])).body.pipeThrough(decompressed);
    const buffer = await new Response(stream).arrayBuffer();

    // 3. Parsing NBT
    const result = await nbt.parse(Buffer.from(buffer));
    return result.parsed
}


//bag
let potion_bag, talisman_bag, fishing_bag, sacks_bag, quiver
async function get_bag() {
    potion_bag = await parseNBTData(membersInfo.inventory.bag_contents.potion_bag.data)
    potion_bag = potion_bag.value.i.value.value

    talisman_bag = await parseNBTData(membersInfo.inventory.bag_contents.talisman_bag.data)
    talisman_bag = talisman_bag.value.i.value.value

    fishing_bag = await parseNBTData(membersInfo.inventory.bag_contents.fishing_bag.data)
    fishing_bag = fishing_bag.value.i.value.value

    sacks_bag = await parseNBTData(membersInfo.inventory.bag_contents.sacks_bag.data)
    sacks_bag = sacks_bag.value.i.value.value

    quiver = await parseNBTData(membersInfo.inventory.bag_contents.quiver.data)
    quiver = quiver.value.i.value.value
}

//inventory_content
let inv_contents
async function get_inv_contents() {
    inv_contents = await parseNBTData(membersInfo.inventory.inv_contents.data)
    inv_contents = inv_contents.value.i.value.value
}
let ender_chest_contents
async function get_ender_chest_contents() {
    ender_chest_contents = await parseNBTData(membersInfo.inventory.ender_chest_contents.data)
    ender_chest_contents = ender_chest_contents.value.i.value.value
}

let inv_armor
async function get_inv_armor() {
    inv_armor = await parseNBTData(membersInfo.inventory.inv_armor.data)
    inv_armor = inv_armor.value.i.value.value
}

let equipment_contents
async function get_equipment_contents() {
    equipment_contents = await parseNBTData(membersInfo.inventory.equipment_contents.data)
    equipment_contents = equipment_contents.value.i.value.value
}

let personal_vault_contents
async function get_personal_vault_contents() {
    personal_vault_contents = await parseNBTData(membersInfo.inventory.personal_vault_contents.data)
    personal_vault_contents = personal_vault_contents.value.i.value.value
}

let wardrobe_contents
async function get_wardrobe_contents() {
    wardrobe_contents = await parseNBTData(membersInfo.inventory.wardrobe_contents.data)
    wardrobe_contents = wardrobe_contents.value.i.value.value
}

function timestampFromLongArray([hi, lo]) {
    const ts = (BigInt(hi) << 32n) + BigInt(lo >>> 0);
    return new Date(Number(ts));
}


async function get_armor_piece_info(n) {
    const main_div = document.getElementById("armor_label");

    const armor = inv_armor[n];
    const value = armor.tag.value;
    const date = sanitizeDate(timestampFromLongArray(value.ExtraAttributes.value.timestamp.value));
    const display = value.display.value;

    const name = display.Name.value;
    const lore = display.Lore.value.value;

    const imgname = name.replace(/§./g, "").replace(/ /g, "_").toUpperCase().replace(" ", "_").replace("-", "").replace("'S", "");

    const img = await fetchImage(imgname);

    const slot = document.createElement("div");
    slot.className = "armor_slot";
    slot.onmouseover = () => overlay.style.display = "block";
    slot.onmouseleave = () => overlay.style.display = "none";

    const img_div = document.createElement("img");
    img_div.className = "armor_img";
    img_div.srcset = img;
    img_div.alt = name;

    const overlay = document.createElement("div");
    overlay.className = "armor_overlay";

    const name_div = document.createElement("p");
    name_div.innerHTML = formatMinecraftTextToHTML(name)

    overlay.appendChild(name_div);
    overlay.appendChild(document.createElement("hr"));

    const date_div = document.createElement("p");
    date_div.textContent = `Obtention: ${date}`;
    overlay.appendChild(date_div);

    lore.forEach(line => {
        const p = document.createElement("p");
        p.innerHTML = formatMinecraftTextToHTML(line);
        overlay.appendChild(p);
    });

    slot.appendChild(img_div);
    slot.appendChild(overlay);

    main_div.after(slot);
}

async function inv_armor_contents() {
    await get_armor_piece_info(0)
    await get_armor_piece_info(1)
    await get_armor_piece_info(2)
    await get_armor_piece_info(3)

}



//inventory 
function isVoid(t) {
    return Object.keys(t).length === 0
}

function lineupinv(line, number) {
    console.log("enterlineupinv", line, number)
    let maindiv = document.getElementById("inv" + line)
    let sub_div = document.createElement("p")
    sub_div.id = number

    let item_count = ""

    if (isVoid(inv_contents[number])) {
        if (inv_contents[number].Count) {
            let count_val = inv_contents[number].Count.value
            item_count = count_val === 1 ? "" : count_val
        }
    }

    sub_div.innerHTML = item_count

    let img_div = document.createElement("img")
    img_div.id = "img" + number

    sub_div.appendChild(img_div)
    maindiv.after(sub_div)
}


function show_lore(i) {
    document.getElementById(i).children[1].style.display = "block"
}
function hide_lore(i) {
    document.getElementById(i).children[1].style.display = "none"
}

async function getiteminfo(i, list) {
    let item = list[i]
    let item_name = item.tag.value.display.value.Name.value
    let img_name = item.tag.value.ExtraAttributes.value.id.value
    let img = await fetchImage(img_name)

    let item_lore = item.tag.value.display.value.Lore.value.value

    let div = document.getElementById(i)
    div.onmouseover = function () {
        show_lore(i);
    }
    div.onmouseleave = function () {
        hide_lore(i);
    }

    let item_name_div = document.createElement("p");
    item_name_div.innerHTML = formatMinecraftTextToHTML(item_name);

    console.log(item_lore)

    document.getElementById("img" + i).srcset = img

    let div_lore = document.createElement("div")
    div_lore.appendChild(item_name_div)
    for (let i = 0; i < item_lore.length; i++) {
        let p = document.createElement("p")
        p.innerHTML = formatMinecraftTextToHTML(item_lore[i])
        div_lore.appendChild(p)
    }
    div.append(div_lore)

    console.log(item_name)
    console.log(img_name)
    console.log(img)
    console.log(item_lore)

}


function do_get_inv_contents(line, a, b) {
    for (let i = a; i > b; i--) {
        if (isVoid(inv_contents[i])) {
            console.log(i, 0)
        } else {
            console.log(i, inv_contents[i].tag.value.display.value.Name.value)
        }
        lineupinv(line, i)
        getiteminfo(i, inv_contents)
    }
}

function gestion_inv_contents() {
    // Ligne 1 (hotbar)
    do_get_inv_contents(1, 8, -1)
    do_get_inv_contents(4, 17, 8)
    do_get_inv_contents(3, 26, 17)
    do_get_inv_contents(2, 35, 26)

}

//ender_chest

async function truc_end1(line, number) {
    console.log("truc_end1",line,number)

    let main_div = document.getElementById("ender-chest")
    
    let sub_div = document.createElement("div")
    let br_div = document.createElement("br")
    
    sub_div.setAttribute("class","inv")

    main_div.appendChild(sub_div)
    main_div.appendChild(br_div)

    let item = ender_chest_contents[number]
    

    /*
    console.log("enterlineupinv", line, number)

    let maindiv = document.getElementById("inv" + line)
    let sub_div = document.createElement("p")
    sub_div.id = number

    let item_count = ""

    if (isVoid(inv_contents[number])) {
        if (inv_contents[number].Count) {
            let count_val = inv_contents[number].Count.value
            item_count = count_val === 1 ? "" : count_val
        }
    }

    sub_div.innerHTML = item_count

    let img_div = document.createElement("img")
    img_div.id = "img" + number

    sub_div.appendChild(img_div)
    maindiv.after(sub_div)
    */
}