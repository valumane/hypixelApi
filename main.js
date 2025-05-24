// Define the API URL
const uuid = 'aa3e247f-f9d2-418e-aadc-949c77aafc7d'
const Collection = 'https://api.hypixel.net/resources/skyblock/collections';


function convertirTempsUnix(tempsUnix) {
  // Vérifiez si le temps Unix est donné en secondes ou en millisecondes
  // Si c'est un temps en secondes, multipliez par 1000 pour obtenir des millisecondes
  const timestamp = tempsUnix < 1e12 ? tempsUnix * 1000 : tempsUnix;

  // Créez un objet Date avec le temps Unix en millisecondes
  const date = new Date(timestamp);

  // Formatez la date pour un affichage lisible
  const options = {
    weekday: 'long', // Nom du jour
    year: 'numeric', // Année
    month: 'long', // Nom du mois
    day: 'numeric', // Jour du mois
    hour: 'numeric', // Heure
    minute: 'numeric', // Minute
    second: 'numeric', // Seconde
    timeZoneName: 'short' // Fuseau horaire
  };

  // Retournez la date formatée en fonction des options définies
  return date.toLocaleString('fr-FR', options);
}

function formatNumber(number) {
  if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(2) + 'b';
  } else if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1) + 'm';
  } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1) + 'k';
  } else {
      return number.toString();
  }
}


let allapi = null;
let apiUrl = "";

async function apiGet() {
  try {
    const api_key_response = await fetch('apri_key.json');
    const api_key_data = await api_key_response.json();
    const apikey = api_key_data.key;
    console.log(apikey);
    
    const apiUrl1 = 'https://api.hypixel.net/v2/skyblock/profiles?key=' + apikey + '&uuid=' + uuid;
    apiUrl = apiUrl1;
    console.log(apiUrl);

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API non disponible');

    const data = await response.json();
    allapi = data;
    console.log('Données récupérées depuis l\'API', allapi);

  } catch (err) {
    console.warn('Erreur avec l\'API, chargement du fichier backup.json…', err);
    const backupResponse = await fetch('backup_API.json');
    const backupData = await backupResponse.json();
    allapi = backupData;
    console.log('Données chargées depuis backup.json', allapi);
  }
}


var membersInfo
function getmemberinfo(){
  membersInfo = allapi.profiles[0].members["aa3e247ff9d2418eaadc949c77aafc7d"]
}


var allCollection;
function getCollection(){

  fetch(Collection)
  .then(response => response.json())
  .then(data => {
    allCollection = data.collections;
    farmingCollection = allCollection.FARMING.items;
    miningCollection = allCollection.MINING.items;
    combatCollection= allCollection.COMBAT.items;
    foragingCollection= allCollection.FORAGING.items;
    fishingCollection= allCollection.FISHING.items;
    riftCollection= allCollection.RIFT.items;
  });

}

var allCollected;
function getCollected() {
  allCollected = allapi.profiles[0].members['aa3e247ff9d2418eaadc949c77aafc7d'].collection;
}


var bankinfo;
function getBankInfo(){
  bankinfo = allapi.profiles[0].banking;
  document.getElementById("bankValue").innerText = "bank value : " + formatNumber(Math.round(bankinfo.balance))
}



function sumAllTiers(coll ){
  var tmp=0;
  for(i=0;i<coll.length;i++){
    tmp += coll[i].amountRequired
  }
  return tmp;
}



function createFarmingdiv(categories, collname, eta, progress,rank) {
  const container = document.getElementById(categories); // Conteneur cible
  
  // Créer le conteneur parent pour l'item collection
  const itemCollectionDiv = document.createElement("div");
  itemCollectionDiv.className = "itemcollection"; // Classe pour le conteneur parent
  
  // creer le conteneur parent pour p et image
  const itemEtImageDiv = document.createElement("div");
  itemEtImageDiv.className = "itemEtImage";


  // créer l'image
  const image = document.createElement("img");
  if(collname=="Gemstone"){
    image.src = "texture/collection/"+categories+"/"+collname+".gif"; // Chemin dynamique
  } else {
    image.src = "texture/collection/"+categories+"/"+collname+".png"; // Chemin dynamique
  }
  image.alt = name; // Texte alternatif
  image.width = 50; // Taille de l'image (modifiable selon besoin)
  image.height = 50; // Taille de l'image (modifiable selon besoin)


  // Créer le paragraphe avec le nom de la collection
  const paragraph = document.createElement("p");
  paragraph.innerText = collname+" "+ rank;

  if(eta == "100%"){
    paragraph.style.color = "#ffa500";
  }
  
  // Créer le conteneur de la barre de progression
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";

  // Créer la barre de progression avec la largeur définie
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.style.width = eta; // Largeur de la barre de progression

  // Créer le texte de progression
  const progressText = document.createElement("div");
  progressText.className = "progress-text";
  progressText.innerText = progress;

  // Assembler les éléments
  progressBar.appendChild(progressText); // Ajouter le texte à la barre
  progressContainer.appendChild(progressBar); // Ajouter la barre au conteneur de progression
  itemEtImageDiv.appendChild(image);
  itemEtImageDiv.appendChild(paragraph); // Ajouter le paragraphe au conteneur parent
  itemCollectionDiv.appendChild(itemEtImageDiv);
  itemCollectionDiv.appendChild(progressContainer); // Ajouter le conteneur de progression au conteneur parent
  
  // Ajouter le conteneur parent au conteneur cible
  container.appendChild(itemCollectionDiv);
}

function createSkilldiv(skillName,eta,rank){
  const container = document.getElementById(skillName);


  const paragraph = document.createElement("p");
  paragraph.innerText = skillName+" "+rank;


  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.style.width = eta;



  const skillContainer = document.createElement("div");
  skillContainer.id = skillName+"Skill"

  const progressText = document.createElement("div");
  progressText.className = "progress-text";
  progressText.innerText = eta;

  const progressContainer = document.createElement("div")
  progressContainer.className = "progress-container"


  //progressContainer.appendChild()

  container.appendChild(paragraph);
  progressContainer.appendChild(progressBar)
  progressBar.appendChild(progressText)
  container.appendChild(progressContainer)

}
/*
<p> enchanting </p>

<div class="progress-bar" style="width: 50%;">
  <div class="progress-text"> 500/1000</div>
</div>


<div class=progress-container>
  <div class="progress-bar" style="width:100%"></div>
  <div class="progress-text"> 1.1m/2.7m (100%) </div>
</div>

*/

function createBestiarydiv(categories,i,count){
  const container = document.getElementById(categories);
  

  const bestiaryCategorie = document.createElement("div")
  bestiaryCategorie.className = "mobsCategorie"

  const name = document.createElement("p");
  name.innerText = categories.replace(" '' ","")[0]

  const progress = document.createElement("p")
  progress.innerText = count

  //const img = document.createElement("img")
  //img.src

  //bestiaryCategorie.appendChild(img);
  bestiaryCategorie.appendChild(name)
  bestiaryCategorie.appendChild(progress)

  container.appendChild(bestiaryCategorie);

  }
  


/*
<div class=bestiaryCategorie>
  <div class=mobEtImage>
    <img>
    <p> nom mob : niveau </p> 
  </div>
  <div class="count">
    <p> kills : </p>
  </div>
</div>

*/


function toggleVisibility(id) {
  const element = document.getElementById(id);
  const button = document.getElementById("toggleButton"+id);
  if (element.classList.contains("visible")) {
    element.classList.replace("visible", "hidden"); // Passer à la classe "hidden"
    button.innerText = "Afficher "+id;
  } else {
    element.classList.replace("hidden", "visible"); // Passer à la classe "visible"
    button.innerText = "Masquer "+id;
  }
}