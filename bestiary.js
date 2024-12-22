var bestiary;
function getBestiary(){
    bestiary = membersInfo.bestiary.kills;
}


var privateIsland = [
    "zombie_1", "zombie_10", "zombie_13", "zombie_15", "zombie_2", "zombie_4", "zombie_5", "zombie_6", "zombie_7", "zombie_8", "zombie_9",
    "witch_5", "witch_6", "witch_7", "witch_8", "witch_9",
    "spider_1", "spider_10", "spider_13", "spider_15", "spider_2", "spider_3", "spider_4", "spider_5", "spider_66", "spider_7", "spider_8", "spider_9",
    "spider_jockey_3", "spider_jockey_42",
    "creeper_1",
    "skeleton_1", "skeleton_10", "skeleton_13", "skeleton_15", "skeleton_2", "skeleton_4", "skeleton_5", "skeleton_6", "skeleton_7", "skeleton_8", "skeleton_9"
];

var hub = [
    "graveyeard_zombie_1", "rat_1", "zombie_villager_1"
];

var farmingIsland = [
    "sheep_1", "cow_1", "chicken_1", "pig_1", "rabbit_1"
];

var spiderDen = [
    "arachne_300", "arachne_500", "arachne_brood_100", "arachne_brood_200", "arachne_keeper_100",
    "voracious_spider_10", "voracious_spider_42", "voracious_spider_45", "voracious_spider_50",
    "splitter_spider_2", "splitter_spider_42", "splitter_spider_45", "splitter_spider_50",
    "splitter_spider_sliverfish_2", "splitter_spider_sliverfish_42", "splitter_spider_sliverfish_45", "splitter_spider_sliverfish_50",
    "dasher_spider_4", "dasher_spider_42", "dasher_spider_45", "dasher_spider_50",
    "weaver_spider_3", "weaver_spider_42", "weaver_spider_45", "weaver_spider50"
];

var theEnd = [
    "wise_dragon_100", "unstable_dragon_100", "strong_dragon_100", "superior_dragon_100", "young_dragon_100", "old_dragon_100", "protector_dragon_100",
    "enderman_1", "enderman_10", "enderman_13", "enderman_15", "enderman_42", "enderman_45", "enderman_5", "enderman_50", "enderman_6", "enderman_7",
    "zealot_bruiser_100", "zealot_enderman_55",
    "obsidian_wither_55",
    "endermite_37", "endermite_40"
];

var crimsonIsle = [
    "blaze_1", "blaze_15", "blaze_25", "blaze_70", "blaze_higher_or_lower_15",
    "ghast_85",
    "magma_boss_500", "magma_cube_75", "magma_cube_rider_90",
    "dojo_knockback_zombie_1", "dojo_knockback_zombie_2", "dojo_knockback_zombie_3", "dojo_knockback_zombie_4"
];

var deepCavern = [
    "lapis_zombie_7",
    "diamond_guy_100", "diamond_guy_120", "diamond_guy_90", "diamond_skeleton_15", "diamond_skeleton_20", "diamond_zombie_15", "diamond_zombie_20",
    "emerald_slime_10", "emerald_slime_15", "emerald_slime_5",
    "redstone_pigman_10"
];

var dwarvenMine = [
    "golbin_50", "golbin_500", "golbin_battler_60", "golbin_creeper_20", "golbin_creepertamer_100", "golbin_creepertamer_90", "golbin_flamethrower_100", "goblin_golem_150", "goblin_knife_thrower_25", "goblin_murderlover_150", "goblin_murderlover_200", "goblin_weakling_bow_25", "goblin_weakling_bow_5", "goblin_weakling_melee_25", "goblin_weakling_melee_5",
    "treasure_hoarder_70", "ice_walker_45",
    "glacite_bowman_165", "glacite_caver_155", "glacite_mage_155"
];

var crystalHollows = [
    "automaton_150", "bal_boss",
    "team_treasurite_corleone_200", "team_treasurite_grunt_50", "team_treasurite_sebastian_100", "team_treasurite_viper_100", "team_treasurite_wendy_100",
    "thyst_20",
    "scatha_10", "worm_5",
    "sludge_10", "sludge_100", "sludge_5",
    "wither_skeleton_70", "wither_gourd_40", "wither_spectre_70",
    "yog_100"
];

var jerry = [
    "mayor_jerry_blue", "mayor_jerry_golden", "mayor_jerry_green", "mayor_jerry_purple"
];

var fishing = [
    "sea_guardian_10", "sea_archer_15", "sea_leech_30", "sea_walker_4", "sea_witch_15", "guardian_defender_45"
];

var catacombs = [
    "bonzo_1", "bonzo_summon_undead_1",
    "watcher", "watcher_scarf_4", "watcher_summon_undead_1", "watcher_summon_undead_2", "watcher_summon_undead_2", "watcher_summon_undead_3", "watcher_summon_undead_4", "watcher_summon_undead_5",
    "crypt_dreadlord_47", "crypt_dreadlord_67", "crypt_dreadlord_77", "crypt_dreadlord_87", "crypt_dreadlord_97",
    "crypt_lurker_41", "crypt_lurker_61", "crypt_lurker_71", "crypt_lurker_81", "crypt_lurker_91",
    "crypt_souleater_45", "crypt_souleater_65", "crypt_souleater_75", "crypt_souleater_85",
    "crypt_tank_zombie_40", "crypt_tank_zombie_60", "crypt_tank_zombie_70", "crypt_tank_zombie_80",
    "lost_adventurerç_101", "lost_adventurerç_102", "lost_adventurerç_82", "lost_adventurerç_85", "lost_adventurerç_86", "lost_adventurerç_87", "lost_adventurerç_90", "lost_adventurerç_91", "lost_adventurerç_92",
    "professor_archer_guardian_1", "professor_guardian_summon_1", "professor_guardian_summon_2",
    "cellar_spider_65", "cellar_spider_85",
    "skeleton_grunt_40", "skeleton_grunt_60", "skeleton_grunt_70", "skeleton_grunt_80",
    "skeleton_master_78", "skeleton_master_88",
    "skeleton_soldier_66", "skeleton_soldier_76", "skeleton_soldier_86", "skeleton_soldier_96",
    "sniper_skeleton_63", "sniper_skeleton_73", "sniper_skeleton_83",
    "scarf_1", "scarf_archer_1", "scarf_mage_1", "scarf_priest_1", "scarf_warrior",
    "zombie_grunt_40", "zombie_grunt_60", "zombie_grunt_70",
    "zombie_knight_86", "zombie_knight_96",
    "zombie_soldier_83", "zombie_soldier_93",
    "dungeon_respawning_skeleton_40", "dungeon_respawning_skeleton_60", "dungeon_respawning_skeleton_70", "dungeon_respawning_skeleton_80", "dungeon_respawning_skeleton_90"
];

var garden = [
    "pest_beetle_1", "pest_cricket_1", "pest_fly_1", "pest_locust_1", "pest_mite_1", "pest_mosquito_1", "pest_moth_1", "pest_rat_1", "pest_slug_1", "pest_worm_1"
];
