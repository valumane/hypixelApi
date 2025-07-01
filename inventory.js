async function load_inventory() {
    await get_bag()
    await get_inv_contents()
    await get_ender_chest_contents()
    await get_inv_armor()
    await get_equipment_contents()
    await get_personal_vault_contents()
    await get_wardrobe_contents()
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