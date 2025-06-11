//skyblock level = Math.floor(membersInfo.leveling.experience/100)


async  function setLevel(){

    levelFarming = membersInfo.player_data.experience.SKILL_FARMING;
    levelMining = membersInfo.player_data.experience.SKILL_MINING;
    levelCombat = membersInfo.player_data.experience.SKILL_COMBAT;
    levelTaming = membersInfo.player_data.experience.SKILL_TAMING;
    levelEnchanting = membersInfo.player_data.experience.SKILL_ENCHANTING;
    levelFishing = membersInfo.player_data.experience.SKILL_FISHING;
    levelForaging = membersInfo.player_data.experience.SKILL_FORAGING;
    levelCarpentry = membersInfo.player_data.experience.SKILL_CARPENTRY;
    levelAlchemy = membersInfo.player_data.experience.SKILL_ALCHEMY;
    levelSocial = membersInfo.player_data.experience.SKILL_SOCIAL;
    levelRunecrafting = membersInfo.player_data.experience.SKILL_RUNECRAFTING;
    //console.log("initié")
    getAllLevel()
}





function getlevel(catname,catlvl,cap){

    var tmp = catlvl;
    var cpt = 0;
    var eta;
    var progress;
    var tof = 0;
    while(tof == 0){       
        if( (tmp - cap[cpt])>0 ){
            tmp = tmp - cap[cpt]
            cpt++;
        } else {
            tof = 1
        }
    }

    eta = Math.round((Math.floor(tmp)/cap[cpt])*100)+"%"
    progress = Math.floor(tmp)+"/"+cap[cpt]

    //console.log(catname+" "+"level:",cpt, " ", progress," ",eta )
    createSkilldiv(catname+"Skill",eta,cpt)
    
    //console.log(catname+"Skill",eta)
}

function getAllLevel(){
    getlevel("farming",levelFarming,farmingcap);
    getlevel("mining",levelMining,miningcap);
    getlevel("combat",levelCombat,combatcap);
    getlevel("taming",levelTaming,tamingcap);
    getlevel("enchanting",levelEnchanting,enchantingcap);
    getlevel("fishing",levelFishing,fishingcap);
    getlevel("foraging",levelForaging,foragingcap);
    getlevel("carpentry",levelCarpentry,carpentrycap);
    getlevel("alchemy",levelAlchemy,alchemycap);
    getlevel("social",levelSocial,socialcap);
    getlevel("runecrafting",levelRunecrafting,runecraftingcap);
}
