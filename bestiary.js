var bestiary;
function getBestiary(){
    bestiary = membersInfo.bestiary.kills;
}


var privateIsland = [
    ["zombie_1", "zombie_2", "zombie_4", "zombie_5", "zombie_6", "zombie_7", "zombie_8", 
    "zombie_9", "zombie_10", "zombie_11", "zombie_12", "zombie_13", "zombie_14", "zombie_15"],
    
    ["witch_1", "witch_2", "witch_3", "witch_4", "witch_5", "witch_6",  "witch_7", 
    "witch_8", "witch_9", "witch_10", "witch_11", "witch_12", "witch_13", "witch_14", "witch_15"],   

    ["spider_1", "spider_2", "spider_3", "spider_4", "spider_5", "spider_6", "spider_7", "spider_8", 
    "spider_9", "spider_10", "spider_11", "spider_12", "spider_13", "spider_14", "spider_15", 
    "spider_66", "spider_jockey_3",  "spider_jockey_42"],

    "creeper_1",

    ["skeleton_1", "skeleton_2", "skeleton_3", "skeleton_4", "skeleton_5", "skeleton_6", "skeleton_7", 
    "skeleton_8", "skeleton_9", "skeleton_10", "skeleton_11", "skeleton_12", "skeleton_13", "skeleton_14", "skeleton_15"], 

    ["enderman_1", "enderman_2", "enderman_3", "enderman_4", "enderman_5", "enderman_6", "enderman_7", "enderman_8", 
    "enderman_9", "enderman_10", "enderman_11", "enderman_12", "enderman_13", "enderman_14", "enderman_15"] 
    
];

var hub = [
    "graveyeard_zombie_1", 
    "rat_1", 
    "zombie_villager_1", 
    ["golden ghoul","unburried_zombie_60"],
    ["crypt ghoul","unburried_zombie_30"],
    "old_wolf_50",
];

var farmingIsland = [
    "sheep_1", "cow_1", "chicken_1", "pig_1", "rabbit_1","mushroom_cow_1",
];

var spiderDen = [
    ["arachne_300", "arachne_500"], 
    ["arachne_brood_100", "arachne_brood_200"], 
    ["dasher_spider_4", "dasher_spider_42", "dasher_spider_45", "dasher_spider_50"],
    ["silverfish","splitter_spider_sliverfish_2", "splitter_spider_sliverfish_42", "splitter_spider_sliverfish_45", "splitter_spider_sliverfish_50","jockey_shot_silverfish_3","jockey_shot_silverfish_42"],
    "arachne_keeper_100",
    ["voracious_spider_10", "voracious_spider_42", "voracious_spider_45", "voracious_spider_50"],
    ["splitter_spider_2", "splitter_spider_42", "splitter_spider_45", "splitter_spider_50"],
    ["weaver_spider_3", "weaver_spider_42", "weaver_spider_45", "weaver_spider50"],
    ["jockey_skeleton_42", "jockey_skeleton_3"]
];

var theEnd = [
    ["dragon","wise_dragon_100", "unstable_dragon_100", "strong_dragon_100", "superior_dragon_100", "young_dragon_100", "old_dragon_100", "protector_dragon_100"],  
    ["enderman_42", "enderman_45", "enderman_50"], 
    ["zealot_bruiser_100", "zealot_enderman_55"], 
    "obsidian_wither_55", 
    ["endermite", "endermite_37", "endermite_40", "nest_endermite_50"], 
    "corrupted_protector_100", 
    "voidling_fanatic_85",
    "watcher_55",
];

var crimsonIsle = [
    ["blaze_25", "blaze_70", "bezal_80", "mutated_blaze_70", "blaze_higher_or_lower_15"], 
    "ghast_85", 
    "magma_boss_500", 
    "magma_cube_75", 
    "magma_cube_rider_90", 
    ["dojo_knockback_zombie_1", "dojo_knockback_zombie_2", "dojo_knockback_zombie_3", "dojo_knockback_zombie_4"],
    "barbarian_duke_x_200", 
    "bladesoul_200", 
    "flaming_spider_80", 
    "flare_90", 
    "kada_knight_90", 
    "pack_magma_cube_90",
    "matcho_100", 
    "charging_mushroom_cow_80", 
    "hellwisp_100", 
    "vanquisher_100",
    "wither_skeleton_70", 
    "wither_spectre_70",
];

var deepCavern = [
    "lapis_zombie_7", 
    ["diamond_skeleton_15", "diamond_skeleton_20"], 
    ["diamond_zombie_15", "diamond_zombie_20"],
    ["emerald_slime_10", "emerald_slime_15", "emerald_slime_5"],
    "redstone_pigman_10"
];

var dwarvenMine = [
    ["diamond goblin","goblin_500"], 
    ["golden goblin","goblin_50"],
    ["goblin", "goblin_murderlover_200", "goblin_flamethrower_100", "goblin_creepertamer_100", "goblin_knife_thrower_25","goblin_weakling_bow_25",  "goblin_weakling_melee_25"],
    ["goblin raid", "goblin_weakling_melee_5", "goblin_weakling_bow_5", "goblin_creepertamer_90", "goblin_creeper_20","goblin_battler_60","goblin_murderlover_150","goblin_golem_150" ], 
    "treasure_hoarder_70", 
    "ice_walker_45", 
    "glacite_bowman_165", 
    "glacite_caver_155", 
    "glacite_mage_155", 
    "powder_ghast_1", 
    "caverns_ghost_250", 
    "glacite_caver_200", 
    "crystal_sentry_50"
]

var crystalHollows = [
    ["automaton_150", "automaton_100"],
    ["bal","bal_boss_100"],
    ["corleone boss","team_treasurite_corleone_200"], 
    ["grunt","team_treasurite_grunt_50","team_treasurite_sebastian_100", "team_treasurite_viper_100", "team_treasurite_wendy_100"], 
    "thyst_20", 
    "scatha_10", "worm_5",
    ["sludge_10", "sludge_100", "sludge_5"], 
    "yog_100", 
    "butterfly_100", 
    "trapped_sludge_10",
]

var jerry = [
    "mayor_jerry_golden_5", 
    "mayor_jerry_green_1",
    "mayor_jerry_blue_2",
    "mayor_jerry_purple_3",
];

var fishingBestiary = [
    "sea_guardian_10", 
    "sea_archer_15", 
    "sea_leech_30", 
    "sea_walker_4", 
    "sea_witch_15", 
    "guardian_defender_45",
    "water_worm_20",
    "catfish_23",
    "pond_squid_1"
];

var catacombs = [
    ["lost_adventurer_92", "lost_adventurer_91","lost_adventurer_85", "lost_adventurer_82","lost_adventurer_90", 
     "lost_adventurer_87", "lost_adventurer_102", "lost_adventurer_101","lost_adventurer_86"],
    ["cellar_spider_65", "cellar_spider_85"],
    ["skeleton_grunt_40", "skeleton_grunt_60", "skeleton_grunt_70", "skeleton_grunt_80"],
    ["skeleton_soldier_66", "skeleton_soldier_76", "skeleton_soldier_86", "skeleton_soldier_96"],
    ["sniper_skeleton_63", "sniper_skeleton_73", "sniper_skeleton_83"], 
    "skeletor_80",
    ["lonely spider","lonely_spider_55", "lonely_spider_65"],
    "bonzo_1",
    ["scarf_1", "scarf_archer_1", "scarf_mage_1", "scarf_priest_1", "scarf_warrior"],
    ["undead skeleton", "dungeon_respawning_skeleton_40", "dungeon_respawning_skeleton_60", "dungeon_respawning_skeleton_70", "dungeon_respawning_skeleton_80", "dungeon_respawning_skeleton_90"],    
    ["scared_skeleton_72", "scared_skeleton_42"],
    ["skeleton_master_78", "skeleton_master_88"],
    ["crypt_dreadlord_47", "crypt_dreadlord_67", "crypt_dreadlord_77", "crypt_dreadlord_87", "crypt_dreadlord_97"],
    ["crypt_souleater_45", "crypt_souleater_65", "crypt_souleater_75", "crypt_souleater_85"],
    ["crypt_lurker_41", "crypt_lurker_61", "crypt_lurker_71", "crypt_lurker_81", "crypt_lurker_91"], 
    ["diamond_guy_100", "diamond_guy_120", "diamond_guy_90"],
    ["zombie_grunt_40", "zombie_grunt_60", "zombie_grunt_70", "zombie_knight_86", "zombie_knight_96", "zombie_soldier_83", "zombie_soldier_93"],
    ["crypt_tank_zombie_40", "crypt_tank_zombie_60", "crypt_tank_zombie_70", "crypt_tank_zombie_80"],
    "super_tank_zombie_90",
    ["crypt_undead_christian_40", "crypt_undead_25"]
]

var garden = [    
    "pest_beetle_1", "pest_cricket_1", "pest_fly_1", "pest_locust_1", "pest_mite_1", 
    "pest_mosquito_1", "pest_moth_1", "pest_rat_1", "pest_slug_1", "pest_worm_1" 
]

var thePark = [
    "howling_spirit_35", "pack_spirit_30", "soul_of_the_alpha_55"]

var SpookyFestival = [
    "batty_witch_60", "horseman_horse_100", "phantom_spirit_35",
    "scary_jerry_30", "trick_or_treater_30", "wraith_50", "bat_pinata_25","wither_gourd_40",

]
/*
var other = [
    "spirit_sheep_1",
    "scarf_warrior_1", 
    "chicken_deep_20",
    "intro_blaze_50",
    "shadow_3",
    "goblin_battler_60",
    "frosty_the_snowman_13",
    "smog_20",
    "random_slime_8",
    "spirit_bat_1", 
    "spirit_bull_1",
    "leech_supreme_10",
    "lagoon_leech_2",
    "invisible_creeper_3",
    "respawning_skeleton_2",
    "silvo_5",
    "belle_10",
    "ruin_wolf_15",
    "vittomite_10",
    "volt_4",
    "minos_hunter_15",
    "cavitak_10", 
    "leech_swarm_3",
    "scared_skeleton_62",
    "fire_bat_5",
    "fire_mage_75",
    "generator_slime_1",
    "spirit_miniboss_130",
    "fireball_magma_cube_75",
    "barbarian_75",
    "shame_1","parasite_30",
    "spirit_chicken_1",
    "liquid_hot_magma_15", 
    "minos_hunter_125",
    "spirit_rabbit_1",
    "deadgehog_2",
    "leech_alpha_5",
    "frozen_steve_7",
    "last_killed_mob",
    "flaming_worm_50", 
    "poisoned_water_worm_25",
    "barking_wolf_2",
    "spirit_wolf_1",
]
*/
let locationList = [privateIsland, hub, farmingIsland, spiderDen, theEnd, crimsonIsle, 
                    deepCavern, dwarvenMine, crystalHollows, jerry, fishingBestiary, catacombs, 
                    garden, thePark, SpookyFestival/*, other*/];
let locationName = ["privateIsland", "hub", "farmingIsland", "spiderDen", "theEnd", "crimsonIsle", 
                    "deepCavern", "dwarvenMine", "crystalHollows", "jerry", "fishingBestiary", "catacombs", 
                    "garden", "thePark", "SpookyFestival"/*, "other"*/];

const zones = locationName.map((name, i) => {
  return {
    name: name,
    data: locationList[i]
  };
});


function sanitizeMobName(name) {
  const lastUnderscore = name.lastIndexOf("_");
  if (lastUnderscore === -1) return name; // aucun "_" trouvé
  return name.substring(0, lastUnderscore);
}

function showbestiarylocation(pos){
    console.log("length",locationList[pos].length-1)
    for(let i =0;i<locationList[pos].length;i++){
        console.log("i",i)
        console.log("zone name",locationName[pos])
        console.log("namemob",(locationList[pos])[i])
        console.log("kill",bestiary[(locationList[pos])[i]])
        createBestiarydiv(locationName[pos],(locationList[pos])[i],bestiary[(locationList[pos])[i]])
        //createBestiarydiv("privateIsland","zombie_1",bestiary["zombie_1"])
    }
}

function addKill(moblist){ //["zombie1","zombie2"] -> 55
    let kill=0;
    for(let i=0;i<moblist.length;i++){
        let killtmp = bestiary[moblist[i]]
        if(killtmp!==undefined){
            kill+=killtmp
        }
    }
    return kill
}

function regroupPerMob(l){
    data=l.data
    
    for(let i = 0; i<data.length;i++){
        let name = data[i][0]
        let kill=0;
        if(typeof data[i] !== "object"){
            name = data[i]
            kill = bestiary[ data[i] ]
        }else{
            kill=addKill(data[i])
        }
        createBestiarydiv(l.name,sanitizeMobName(name),kill)
    }
}


function testbestiary(l){
    for(let i = 0;i<l.length;i++){
        console.log(l[i],bestiary[l[i]])
    }
}

function showAllBestiary(){
    for(let i=0;i<16;i++){
        regroupPerMob(zones[i])
    }
}