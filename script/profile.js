async function load_profies() {
    await show_pseudo()
    await get_purse()
    await getBankInfo()
    await get_first_join()
    await get_level()
    await get_skill_lvl()
}
//showpseudo 
async function show_pseudo() {
    let pseudo_div = document.createElement("p")
    let main_div = document.getElementById("bankValue")
    pseudo_div.innerText = "pseudo : "+username
    main_div.before(pseudo_div)
}
//purse
var purse
async function get_purse() {
    purse = roundNumber(membersInfo.currencies.coin_purse)
    let main_div = document.getElementById("bankValue")
    let sub_div = document.createElement("p")
    sub_div.innerText = "purse : "+ purse
    main_div.before(sub_div)
}

//bank
var bankinfo;
async function getBankInfo() {
    bankinfo = allapi.profiles[0].banking;
    document.getElementById("bankValue").innerText = "bank value : " + roundNumber(Math.round(bankinfo.balance))
}


//first join
async function get_first_join() {
    let timestamp = membersInfo.profile.first_join;
    const now = Date.now();
    const diffMs = now - timestamp;

    const seconds = diffMs / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30.44;
    const years = days / 365.25;

    let res;
    if (years >= 1) {
        res = `${Math.floor(years)} year${Math.floor(years) > 1 ? "s" : ""} ago`;
    } else if (months >= 1) {
        res = `${Math.floor(months)} month${Math.floor(months) > 1 ? "s" : ""} ago`;
    } else if (days >= 1) {
        res = `${Math.floor(days)} day${Math.floor(days) > 1 ? "s" : ""} ago`;
    } else if (hours >= 1) {
        res = `${Math.floor(hours)} hour${Math.floor(hours) > 1 ? "s" : ""} ago`;
    } else {
        res = `Just now`;
    }
    let div = document.getElementById("bankValue")
    let joined_div = document.createElement("p")
    joined_div.innerText = "first joined : "+res
    div.after(joined_div)
}


let skyblock_level
async function get_level() {
    skyblock_level = Math.floor(membersInfo.leveling.experience / 100)
    let div = document.getElementById("bankValue")
    let level_div = document.createElement("p")
    level_div.innerText = "global level : " + skyblock_level
    div.after(level_div)
}


//------------skill
async function get_skill_lvl() {
    const skills = [
        "farming", "mining", "combat", "taming", "enchanting", "fishing",
        "foraging", "carpentry", "alchemy", "social", "runecrafting"
    ];

    const experienceData = membersInfo.player_data.experience;

    skillLevels = {};

    skills.forEach(skill => {
        const key = `SKILL_${skill.toUpperCase()}`; //SKILL_FARMING
        skillLevels[skill] = experienceData[key]; //skillLevels["farming"] = experienceData[SKILL_FARMING]
    });

    getAllLevel();
}

function getlevel(catname, catlvl, cap) {
    let tmp = catlvl;
    let cpt = 0;

    while (tmp >= cap[cpt]) {
        tmp -= cap[cpt++];
    }

    const eta = Math.round((tmp / cap[cpt]) * 100) + "%";
    const progress = `${Math.floor(tmp)}/${cap[cpt]}`;

    createSkilldiv(`${catname}Skill`, eta, cpt);
}

function getAllLevel() {
    const caps = {
        farming: farmingcap, mining: miningcap, combat: combatcap, taming: tamingcap, enchanting: enchantingcap, fishing: fishingcap,
        foraging: foragingcap, carpentry: carpentrycap, alchemy: alchemycap, social: socialcap, runecrafting: runecraftingcap
    };

    for (const skill in skillLevels) {
        getlevel(skill, skillLevels[skill], caps[skill]);
    }
}
