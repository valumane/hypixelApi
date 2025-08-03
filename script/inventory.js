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

    await inv_armor_contents(); console.log("-- inv_armor_contents loaded")

    gestion_inv_contents()
    show_ender_chest()
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


    let item_name_div = document.createElement("p");
    item_name_div.innerHTML = formatMinecraftTextToHTML(item_name);

    console.log(item_lore)

    let imgdiv = document.getElementById("img" + i)
    imgdiv.srcset = img

    let div_lore = document.createElement("div")
    div_lore.appendChild(item_name_div)
    for (let i = 0; i < item_lore.length; i++) {
        let p = document.createElement("p")
        p.innerHTML = formatMinecraftTextToHTML(item_lore[i])
        div_lore.appendChild(p)
    }
    div.append(div_lore)
    imgdiv.onmouseover = function () {
        show_lore(i);
    }
    imgdiv.onmouseleave = function () {
        hide_lore(i);
    }
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
function get_item_name(element) {
    return element.tag.value.display.value.Name.value
}
function get_img_name(element) {
    return element.tag.value.ExtraAttributes.value.id.value
}
async function get_img(element) {
    let img_name = get_img_name(element)
    let img = await fetchImage(img_name)
    return img
}
function get_item_lore(element) {
    return element.tag.value.display.value.Lore.value.value
}




async function show_ender_chest() {
    show_ender_chest_aux(1, 8, -1)
    show_ender_chest_aux(2, 17, 8)
    show_ender_chest_aux(3, 26, 17)
    show_ender_chest_aux(4, 35, 26)
    show_ender_chest_aux(5, 44, 35)
    show_ender_chest_aux(6, 53, 44)
    show_ender_chest_aux(7, 62, 53)
    show_ender_chest_aux(8, 71, 62)
    show_ender_chest_aux(9, 80, 71)
    show_ender_chest_aux(10, 89, 80)
    show_ender_chest_aux(11, 98, 89)
    show_ender_chest_aux(12, 107, 98)
    show_ender_chest_aux(13, 116, 107)
    show_ender_chest_aux(14, 125, 116)
    show_ender_chest_aux(15, 134, 125)
}

async function show_ender_chest_aux(line, a, b) {
    let main_div = document.getElementById("end" + line);

    for (let i = a; i > b; i--) {
        const index = i;
        const item = ender_chest_contents[index];

        let imgdata, item_name, item_lore, img_name;
        if (!isVoid(item)) {
            item_name = get_item_name(item);
            img_name = get_img_name(item);
            imgdata = await fetchImage(img_name);
            item_lore = get_item_lore(item);
        } else {
            item_name = "";
            img_name = "";
            imgdata = "";
            item_lore = "";
        }

        // Création du bloc principal
        const p_slot = document.createElement("p");
        p_slot.id = index;

        // Image
        const img = document.createElement("img");
        img.id = "img" + index;
        img.srcset = imgdata;
        p_slot.appendChild(img);

        // Overlay div (invisible par défaut)
        const div_lore = document.createElement("div");

        // Nom de l'item
        const item_name_p = document.createElement("p");
        item_name_p.innerHTML = formatMinecraftTextToHTML(item_name);
        div_lore.appendChild(item_name_p);

        // Lore
        for (let j = 0; j < item_lore.length; j++) {
            const lore_p = document.createElement("p");
            lore_p.innerHTML = formatMinecraftTextToHTML(item_lore[j]);
            div_lore.appendChild(lore_p);
        }

        // Ajout de la div de lore au slot
        p_slot.appendChild(div_lore);
        div_lore.setAttribute("id", "end" + i)
        // Si slot non vide : activer le comportement de survol
        if (!isVoid(item)) {
            img.onmouseover = () => document.getElementById("end" + i).style.display = "block";
            img.onmouseleave = () => document.getElementById("end" + i).style.display = "none";
        }

        // Ajout du slot dans la ligne
        main_div.after(p_slot);
    }
}
