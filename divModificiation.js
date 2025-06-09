
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

  if (progress.includes('undefined')) {
    progress = "";
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
function createBestiarydiv(categories, nameMob, count, imgSrc = "") {
  const container = document.getElementById(categories);
  if (!container) {
    console.warn(`Container introuvable pour l'ID : ${categories}`);
    return;
  }

  const bestiaryCategorie = document.createElement("div");
  bestiaryCategorie.className = "bestiaryCategorie";

  const mobEtImage = document.createElement("div");
  mobEtImage.className = "mobEtImage";

  const img = document.createElement("img");
  img.className = "mobhead";

  if (imgSrc) {
    img.src = imgSrc;
  } else {
    img.src = `texture/mobs/${categories}/${nameMob}.webp`;
  }

  const name = document.createElement("p");
  name.innerText = nameMob;

  mobEtImage.appendChild(img);
  mobEtImage.appendChild(name);

  const countDiv = document.createElement("div");
  countDiv.className = "count";

  const progress = document.createElement("p");
  progress.innerText = `kills : ${count}`;
  countDiv.appendChild(progress);

  bestiaryCategorie.appendChild(mobEtImage);
  bestiaryCategorie.appendChild(countDiv);

  container.appendChild(bestiaryCategorie);
}


function toggleVisibility(id) {
  const element = document.getElementById(id);
  if (element.classList.contains("visible")) {
    element.classList.replace("visible", "hidden"); // Passer à la classe "hidden"
    putAtOriginalPosition(id)
  } else {
    element.classList.replace("hidden", "visible"); // Passer à la classe "visible"
    putAfterButton(id)
  }
}

function t(){
  let all = document.getElementById('bestiary').childNodes;
  return all;
}


function removeNth(nodeList, n) {
  const node = nodeList[n];
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

function insertBeforeNth(nodeList, newElement, n) {
  const refNode = nodeList[n];
  if (refNode && refNode.parentNode) {
    refNode.parentNode.insertBefore(newElement, refNode);
  } else if (nodeList.length > 0) {
    nodeList[0].parentNode.appendChild(newElement);
  }
}


let originalPos;
function divDetection() {
  let res = [];
  const nodes = t();
  for (let i = 1; i < nodes.length; i++) {
    const child = nodes[i];
    if (child instanceof HTMLElement) {
      if (child.getAttributeNames().includes('onclick')==false) {
        res.push([i,child]); // ou res.push(i), si tu veux l'index
      }
    }
  }

  originalPos = res;
}


function putAfterButton(nomButton) {
  let divButton = null;
  let divToMove = null;

  // Cherche le bouton avec onclick="toggleVisibility('nomButton')"
  for (let i = 0; i < t().length; i++) {
    const button = t()[i];
    if (
      button instanceof HTMLElement && button.getAttribute('onclick') &&
      button.getAttribute('onclick').includes(`'${nomButton}'`)
    ) {
      divButton = button;
      break;
    }
  }
  // Cherche la div correspondante dans divDetection()
  const original = originalPos;
  for (let i = 0; i < original.length; i++) {
    const div = original[i][1];
    if (div.id === nomButton) {
      divToMove = div;
      break;
    }
  }
  // Si les deux sont trouvés, on bouge la div juste après le bouton
  if (divButton && divToMove) {
    divButton.after(divToMove);
  } else {
    console.warn("Bouton ou div introuvable pour :", nomButton);
    console.log("div :",div)
    console.log("button :",divButton)
  }
}


function putAtOriginalPosition(nomDiv) {
  let div = null;
  const dom = t(); // liste des enfants de #bestiary

  // Trouver la div dans le DOM
  for (let i = 0; i < dom.length; i++) {
    if (dom[i].id === nomDiv) {
      div = dom[i];
      break;
    }
  }

  // Trouver la position originale dans divDetection
  let originalIndex = -1;
  for (let i = 0; i < originalPos.length; i++) {
    const [index, element] = originalPos[i];
    if (element.id === nomDiv) {
      originalIndex = index;
      break;
    }
  }

  // Réinsère la div à sa position d'origine
  if (div && originalIndex !== -1) {
    const parent = div.parentNode;
    const refNode = dom[originalIndex];
    
    if (refNode) {
      parent.insertBefore(div, refNode);
    } else {
      parent.appendChild(div); // fallback si l'index original est out of range
    }
  } else {
    console.warn("Impossible de remettre la div :", nomDiv);
  }
}



