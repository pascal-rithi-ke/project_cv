// Récupérer Url Json server
const link_data = "http://localhost:3000/";

//Récupération data dans "owner" avec l'Url de base +le paramètre "projet"
function getdata(){
  fetch(`${link_data}projet`)
  .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then(data => {
      console.log(data);
      //stock les données dans la fonction "displaydata";
      displaydata(data)
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}getdata()

// fonction qui va afficher les données "projet"
function displaydata(data){
  const dataProjet = {
      // Création Obj "owner" pour pouvoir récupérer et éviter de taper toutes les informations
      scolaire1 : data[0].scolaire1[0],
      scolaire2 : data[0].scolaire2[0],
      scolaire3 : data[0].scolaire3[0],
      solo1 : data[0].solo1[0]
  };
  // template de l'affichage de la page projet, récupération des données de l'objet dataProjet avec le signe '$'
  function templateProjet($dataProjet){
    // Récupération des divs dans le code HTML pour insérer les éléments
      const leftTopDiv = document.getElementById("leftTop");
      const rightTopDiv = document.getElementById("rightTop");
      const leftBotDiv = document.getElementById("bottom1");
      const rightBotDiv = document.getElementById("bottom2");
      
    // Création des éléments pour la mise en page
      const elemImgLeftTop = document.createElement("img");
      const elemImgRightTop = document.createElement("img");
      const elemImgLeftBot = document.createElement("img");
      const elemImgRightBot = document.createElement("img");
      const elemInfoP1 = document.createElement("p");
      const elemInfoP2 = document.createElement("p");
      const elemLeftBotP1 = document.createElement("p");
      const elemRighBotP2 = document.createElement("p");
    
    // "paramétrage" des éléments en précisant les informations de type src,id,title,valeur...
      elemImgLeftTop.src = dataProjet.scolaire1.photo;
      elemImgRightTop.src = dataProjet.scolaire2.photo;
      elemImgLeftBot.src = dataProjet.scolaire3.photo;
      elemImgRightBot.src = dataProjet.solo1.photo;
    
      elemInfoP1.innerHTML = "Projet Scolaire n°1<br>Titre: "+dataProjet.scolaire1.name +"<br>Description: "+dataProjet.scolaire1.description + "<br><a href='"+dataProjet.scolaire1.link+"'>Lien Git</a>"
      elemInfoP2.innerHTML = "Projet Scolaire n°2<br>Titre: "+dataProjet.scolaire2.name +"<br>Description: "+ dataProjet.scolaire2.description + "<br><a href='"+dataProjet.scolaire2.link+"'>Lien Git</a>"
      elemLeftBotP1.innerHTML = "Projet Scolaire n°3<br>Titre: "+dataProjet.scolaire3.name +"<br>Description: "+ dataProjet.scolaire3.description + "<br><a href='"+dataProjet.scolaire3.link+"'>Lien Git</a>"
      elemRighBotP2.innerHTML = "Projet Solo<br>Titre: "+dataProjet.solo1.name +"<br>Description: "+ dataProjet.solo1.description + "<br><a href='"+dataProjet.solo1.link+"'>Lien Git</a>"
      
    // ajout des élments dans les divs parents attribués
      leftTopDiv.appendChild(elemImgLeftTop);
      rightTopDiv.appendChild(elemImgRightTop);
      leftBotDiv.appendChild(elemImgLeftBot);
      rightBotDiv.appendChild(elemImgRightBot);
      leftTopDiv.appendChild(elemInfoP1);
      rightTopDiv.appendChild(elemInfoP2);
      leftBotDiv.appendChild(elemLeftBotP1);
      rightBotDiv.appendChild(elemRighBotP2);
  }templateProjet();
}