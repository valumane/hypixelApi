async function load_inventory() {
    await get_bag()
    console.log("- get_bag loaded")

    await get_inv_contents()
    console.log("- get_inv_contents loaded")

    await get_ender_chest_contents()
    console.log("- get_ender_chest_contents loaded")

    await get_inv_armor()
    console.log("- get_inv_armor loaded")

    await get_equipment_contents()
    console.log("- get_equipment_contents loaded")

    await get_personal_vault_contents()
    console.log("- get_personal_vault_contents loaded")

    await get_wardrobe_contents()
    console.log("- get_wardrobe_contents loaded")

    //await inv_armor_contents()
    //console.log("-- inv_armor_contents loaded")


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



async function fetchimg(name) {
    const url = "https://raw.githubusercontent.com/valumane/hypixel_texture/main/head/1" + name[0].toLowerCase() + "/" + name + ".json";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erreur réseau : " + response.statusText);
        }
        const data = await response.json();
        return data.img;
    } catch (error) {
        console.error("Erreur :", error);
        return null;
    }
}

// Exemple d'appel :
async function setImage(name) {
    const imgname = name.replace(/§./g, "").replace(/ /g, "_").toUpperCase();
    const img = await fetchimg(imgname);

    if (img) {
        const element = document.getElementById(imgname);
        if (element) {
            element.src = img; // ou .srcset = img selon le cas
        } else {
            console.warn("Élément introuvable :", imgname);
        }
    }
}




async function get_armor_piece_info(n) {
    const main_div = document.getElementById("armor_label");

    const armor = inv_armor[n];
    const count = armor.Count.value !== 1 ? `count : ${armor.Count.value}` : "";
    const value = armor.tag.value;
    const date = sanitizeDate(timestampFromLongArray(value.ExtraAttributes.value.timestamp.value));
    const display = value.display.value;

    const name = display.Name.value;
    const imgname = name.replace(/§./g, "").replace(/ /g, "_").toUpperCase();
    const img = await fetchimg(imgname);

    const lore = display.Lore.value.value;

    const img_div = document.createElement("img");
    img_div.id = imgname;
    img_div.srcset = img;

    const sub_div = document.createElement("pre"); // bloc texte avec sauts de ligne respectés
    sub_div.className = "armor_piece";
    sub_div.innerText =
        `name : ${name} ${count}\n` +
        `obtention date : ${date}\n` +
        `lore :\n${lore.join("\n")}`;

    // 👉 conteneur flex qui contient texte + image
    const wrapper = document.createElement("div");
    wrapper.className = "armor_wrapper";
    wrapper.appendChild(sub_div);
    wrapper.appendChild(img_div);

    main_div.after(wrapper, document.createElement("br"));

    console.log("count :", count);
    console.log("obtention date :", date);
    console.log("armor lore :", lore);
    console.log("armor pieces name :", name);
    console.log("imgname", imgname);
    console.log("---------");
}


async function inv_armor_contents() {
    for (let i = 0; i < inv_armor.length; i++) {
        get_armor_piece_info(i)
    }
}


