let sack_bag

// Textures absentes de ton dossier texture/sack/
const SACK_TEXTURES_ABSENTES = new Set([
    "Small_Mutations_Sack",
    "Large_Bait_Sack",
    "Beginner_Fishing_Sack"
]);

async function load_sack() {
    sack_bag = await parseNBTData(
        membersInfo.inventory.bag_contents.sacks_bag.data
    );

    sack_bag = sack_bag.value.i.value.value;

    await afficherSacks(membersInfo.inventory.sacks_counts);
}


// Récupère les sacks réellement possédés
function show_sack() {
    const sacs = [];

    for (const item of sack_bag) {
        const rawName = item?.tag?.value?.display?.value?.Name?.value;

        if (!rawName) continue;

        // Retire les codes couleurs Minecraft
        const cleanName = rawName
            .replace(/§[0-9a-fk-or]/gi, "")
            .replaceAll("_", " ");

        // Ex : Large Combat Sack -> Combat Sack
        const type = cleanName.replace(
            /^(Beginner|Small|Medium|Large)\s+/,
            ""
        );

        // Ex : Large_Combat_Sack.webp
        const fileName = cleanName.replaceAll(" ", "_");

        const texture = SACK_TEXTURES_ABSENTES.has(fileName)
            ? "texture/background/default.png"
            : `texture/sack/${fileName}.webp`;

        sacs.push({
            rawName,
            type,
            texture
        });
    }

    return sacs;
}


async function generate_card(item_name, item_count) {
    let div = document.createElement("div")
    div.setAttribute("class", "sack_item_card")

    let div_name = document.createElement("div")
    div_name.setAttribute("class", "sack_item_name")
    div_name.textContent = item_name.replaceAll("_", " ")

    let sub_div = document.createElement("div")
    sub_div.setAttribute("class", "sack_item_sub_div")

    let texture = document.createElement("img")
    texture.src = await fetchImage(item_name)
    texture.setAttribute("class", "sack_item_texture")

    sub_div.append(texture)
    sub_div.append(document.createTextNode(item_count))

    div.append(div_name)
    div.append(sub_div)

    return div
}

//----------------------

const SACK_ITEMS = {
    "Mining Sack": [
        "COAL", "COBBLESTONE", "DIAMOND", "EMERALD", "ENDER_STONE",
        "GOLD_INGOT", "GRAVEL", "HARD_STONE", "IRON_INGOT",
        "INK_SACK:4", "MITHRIL_ORE", "TITANIUM_ORE", "OBSIDIAN",
        "REDSTONE", "SAND", "SAND:1", "STONE", "GLACITE",
        "TUNGSTEN", "UMBER", "STARFALL", "TREASURITE",
        "SULPHUR_ORE", "NETHERRACK", "GLOSSY_GEMSTONE",
        "REFINED_MINERAL"
    ],

    "Enchanted Mining Sack": [
        "ENCHANTED_COBBLESTONE", "ENCHANTED_COAL",
        "ENCHANTED_IRON", "ENCHANTED_GOLD", "ENCHANTED_DIAMOND",
        "ENCHANTED_LAPIS_LAZULI", "ENCHANTED_EMERALD",
        "ENCHANTED_REDSTONE", "ENCHANTED_OBSIDIAN",
        "ENCHANTED_ENDSTONE", "ENCHANTED_MITHRIL",
        "ENCHANTED_TITANIUM", "ENCHANTED_HARD_STONE",
        "ENCHANTED_COAL_BLOCK", "ENCHANTED_DIAMOND_BLOCK",
        "ENCHANTED_EMERALD_BLOCK", "ENCHANTED_GOLD_BLOCK",
        "ENCHANTED_IRON_BLOCK", "ENCHANTED_REDSTONE_BLOCK",
        "ENCHANTED_GLACITE", "ENCHANTED_TUNGSTEN",
        "ENCHANTED_UMBER"
    ],

    "Agronomy Sack": [
        "WHEAT", "SEEDS", "PUMPKIN", "POTATO_ITEM", "CARROT_ITEM",
        "SUGAR_CANE", "NETHER_STALK", "HAY_BLOCK", "CACTUS",
        "MELON", "INK_SACK:3", "INK_SACK:2", "RED_MUSHROOM",
        "BROWN_MUSHROOM", "POISONOUS_POTATO",
        "MOONFLOWER", "SUNFLOWER", "WILD_ROSE"
    ],

    "Enchanted Agronomy Sack": [
        "ENCHANTED_POTATO", "ENCHANTED_CARROT",
        "ENCHANTED_HAY_BLOCK", "ENCHANTED_SUGAR",
        "ENCHANTED_PUMPKIN", "ENCHANTED_SEEDS",
        "ENCHANTED_MELON", "ENCHANTED_MELON_BLOCK",
        "ENCHANTED_BAKED_POTATO", "ENCHANTED_COCOA",
        "ENCHANTED_NETHER_STALK", "ENCHANTED_CACTUS_GREEN",
        "ENCHANTED_RED_MUSHROOM", "ENCHANTED_BROWN_MUSHROOM",
        "MUTANT_NETHER_STALK", "ENCHANTED_SUGAR_CANE",
        "ENCHANTED_CACTUS", "ENCHANTED_WHEAT",
        "ENCHANTED_MOONFLOWER", "ENCHANTED_WILD_ROSE",
        "ENCHANTED_SUNFLOWER", "COMPACTED_WILD_ROSE"
    ],

    "Foraging Sack": [
        "LOG", "LOG:1", "LOG:2", "LOG:3", "LOG_2", "LOG_2:1",
        "SAPLING", "SAPLING:1", "SAPLING:2", "APPLE",
        "FIG_LOG", "TENDER_WOOD", "SEA_LUMIES", "MANGROVE_LOG",
        "LUSHLILAC", "VINESAP", "BAMBOO", "STRETCHING_STICKS",
        "STICK"
    ],

    "Enchanted Foraging Sack": [
        "ENCHANTED_OAK_LOG", "ENCHANTED_DARK_OAK_LOG",
        "ENCHANTED_FIG_LOG"
    ],

    "Combat Sack": [
        "SPIDER_EYE", "STRING", "BONE", "ROTTEN_FLESH",
        "BLAZE_ROD", "ENDER_PEARL", "MAGMA_CREAM", "SLIME_BALL",
        "GHAST_TEAR", "ARACHNE_KEEPER_FRAGMENT",
        "ARACHNE_FRAGMENT", "SOUL_STRING", "SULPHUR"
    ],

    "Enchanted Combat Sack": [
        "ENCHANTED_ROTTEN_FLESH", "ENCHANTED_ENDER_PEARL",
        "ENCHANTED_EYE_OF_ENDER"
    ],

    "Fishing Sack": [
        "RAW_FISH", "RAW_FISH:1", "RAW_FISH:2", "RAW_FISH:3",
        "INK_SACK", "PRISMARINE_CRYSTALS", "PRISMARINE_SHARD",
        "SPONGE", "WATER_LILY", "CLAY_BALL", "CHUM",
        "BRONZE_BOWL", "RUSTY_COIN", "HALF_EATEN_MUSHROOM",
        "GLOWING_MUSHROOM", "WORM_MEMBRANE"
    ],

    "Enchanted Fishing Sack": [
        "ENCHANTED_RAW_SALMON", "ENCHANTED_RAW_FISH",
        "ENCHANTED_SPONGE", "ENCHANTED_PUFFERFISH"
    ],

    "Bait Sack": [
        "FISH_BAIT", "TREASURE_BAIT", "ICE_BAIT"
    ],

    "Slayer Sack": [
        "TARANTULA_WEB", "UNDEAD_CATALYST", "WOLF_TOOTH",
        "REVENANT_FLESH", "SPIDER_CATALYST", "NULL_SPHERE",
        "REVENANT_CATALYST", "TOXIC_ARROW_POISON"
    ],

    "Crystal Hollows Sack": [
        "ASCENSION_ROPE", "BOB_OMB", "CONTROL_SWITCH",
        "ELECTRON_TRANSMITTER", "FTX_3070", "JUNGLE_KEY",
        "SUPERLITE_MOTOR", "SYNTHETIC_HEART", "WISHING_COMPASS",
        "YOGGIE", "ROBOTRON_REFLECTOR", "CORLEONITE",
        "SLUDGE_JUICE", "OIL_BARREL"
    ],

    "Dwarven Sack": [
        "PLASMA", "BIOFUEL"
    ],

    "Garden Sack": [
        "CROPIE", "COMPOST", "SQUASH"
    ],

    "Winter Sack": [
        "GREEN_GIFT", "RED_GIFT", "WHITE_GIFT",
        "VOLCANIC_ROCK", "GLACIAL_FRAGMENT", "SNOW_BALL",
        "ICE", "PACKED_ICE", "ENCHANTED_ICE",
        "ENCHANTED_PACKED_ICE"
    ],

    "Mutations Sack": [
        "DUSTGRAIN", "ASHWREATH", "DEAD_PLANT"
    ]
};


// Correspondance entre identifiant d'item et type de Sack
const SACK_LOOKUP = new Map();

for (const [type, items] of Object.entries(SACK_ITEMS)) {
    for (const id of items) {
        if (!SACK_LOOKUP.has(id)) {
            SACK_LOOKUP.set(id, type);
        }
    }
}


// Reconnaissance des gemstones
const GEMSTONE_REGEX =
    /^(ROUGH|FLAWED|FINE)_(AMBER|AMETHYST|AQUAMARINE|CITRINE|JADE|JASPER|ONYX|OPAL|PERIDOT|RUBY|SAPPHIRE|TOPAZ)_GEM$/;


// Retourne le type de Sack correspondant à un item
function getSackType(itemId) {
    if (GEMSTONE_REGEX.test(itemId)) {
        return "Gemstone Sack";
    }

    return SACK_LOOKUP.get(itemId) ?? "Autres";
}


// Affiche les sacks possédés et leur contenu

async function afficherSacks(sacksCounts) {
    const container = document.getElementById("sack");
    if (!container) return;

    const groupes = new Map();

    // Récupérer les sacks possédés
    for (const sac of show_sack()) {
        if (!groupes.has(sac.type)) {
            groupes.set(sac.type, { sacs: [], items: [] });
        }

        groupes.get(sac.type).sacs.push(sac);
    }

    // Répartir les items dans leurs sacks
    for (const [id, quantite] of Object.entries(sacksCounts ?? {})) {
        if (quantite <= 0) continue;

        const type = getSackType(id);
        const destination = groupes.has(type) ? type : "Autres";

        if (!groupes.has(destination)) {
            groupes.set(destination, { sacs: [], items: [] });
        }

        groupes.get(destination).items.push({ id, quantite });
    }

    container.replaceChildren();

    // Barre horizontale contenant les icônes des sacks
    const barre = document.createElement("div");
    barre.className = "sack-selector";
    barre.setAttribute("role", "group");
    barre.setAttribute("aria-label", "Sélectionner un sack");

    // Panneau contenant les items du sack sélectionné
    const panneau = document.createElement("section");
    panneau.className = "sack-content";

    const titre = document.createElement("h3");
    titre.className = "sack-content-title";

    const liste = document.createElement("ul");
    liste.className = "sack-content-list";

    panneau.append(titre, liste);
    container.append(barre, panneau);

    const boutons = [];
    const cartesEnCache = new Map();

    let derniereSelection = 0;

    // Changer le contenu lorsqu'on sélectionne un sack
    async function selectionnerSack(type, bouton) {
        const selection = ++derniereSelection;

        for (const element of boutons) {
            const actif = element === bouton;

            element.classList.toggle("active", actif);
            element.setAttribute("aria-pressed", String(actif));
        }

        const groupe = groupes.get(type);

        titre.textContent = `${type} (${groupe.items.length} items)`;
        liste.replaceChildren();

        if (groupe.items.length === 0) {
            const vide = document.createElement("li");
            vide.className = "sack-message";
            vide.textContent = "Ce sack est vide.";

            liste.append(vide);
            return;
        }

        const chargement = document.createElement("li");
        chargement.className = "sack-message";
        chargement.textContent = "Chargement des textures…";

        liste.append(chargement);

        // Générer les cartes une seule fois par catégorie
        if (!cartesEnCache.has(type)) {
            groupe.items.sort((a, b) => a.id.localeCompare(b.id));

            cartesEnCache.set(
                type,
                Promise.all(
                    groupe.items.map(item =>
                        generate_card(item.id, item.quantite)
                    )
                )
            );
        }

        try {
            const cartes = await cartesEnCache.get(type);

            // Éviter d'afficher une ancienne sélection
            if (selection !== derniereSelection) return;

            const fragment = document.createDocumentFragment();

            for (const carte of cartes) {
                const li = document.createElement("li");
                li.append(carte);
                fragment.append(li);
            }

            liste.replaceChildren(fragment);

        } catch (erreur) {
            cartesEnCache.delete(type);

            if (selection !== derniereSelection) return;

            console.warn("Impossible d'afficher le sack :", type, erreur);

            const message = document.createElement("li");
            message.className = "sack-message";
            message.textContent = "Impossible de charger les items.";

            liste.replaceChildren(message);
        }
    }

    // Créer les boutons de sélection
    for (const [type, groupe] of groupes) {
        if (type === "Autres" && groupe.items.length === 0) {
            continue;
        }

        for (const sac of groupe.sacs.length ? groupe.sacs : [null]) {
            const bouton = document.createElement("button");

            bouton.type = "button";
            bouton.className = "sack-selector-button";

            const nom = sac
                ? sac.rawName
                    .replace(/§[0-9a-fk-or]/gi, "")
                    .replaceAll("_", " ")
                : type;

            bouton.title = nom;
            bouton.setAttribute("aria-label", nom);
            bouton.setAttribute("aria-pressed", "false");

            if (sac) {
                const icone = document.createElement("img");

                icone.src = sac.texture;
                icone.alt = "";

                bouton.append(icone);
            } else {
                bouton.textContent = "?";
            }

            bouton.addEventListener("click", () => {
                selectionnerSack(type, bouton);
            });

            boutons.push(bouton);
            barre.append(bouton);
        }
    }

    // Sélectionner automatiquement le premier sack
    if (boutons.length > 0) {
        boutons[0].click();
    }
}
