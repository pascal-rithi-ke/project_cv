// function change backgroundColor avec l'icon "soleil"
function ChangeBgColor(){
var element = document.body;
element.classList.toggle("dark-mode");
}

// Récupérer Url Json server
const link_data = 'http://localhost:3000/';

// chargement du script afficher lettre par lettre au lancement sur la page d'accueil
function load_script(){
  var start = 0;
  var txt = 'Chargement informations...';
  var speed = 50;
  function presentation() {
      if (start < txt.length) {
      document.getElementById("text").innerHTML += txt.charAt(start);
      start++;
      setTimeout(presentation, speed);
      }
      if (start >=txt.length){
          setTimeout(function(){
              document.getElementById("text").style.display = "none";
              setTimeout(function(){
              document.getElementById("main").style.display = "block";
              },500);
          }, 1000);
      }
  }presentation();

//Récupération data dans "owner" avec l'Url de base +le paramètre "owner"
  function getdata(){
      fetch(`${link_data}owner`)
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

// fonction qui va afficher les données "owner" ici dans le menu Burger dans l'img cliquable en haut à gauche de l'accueil
  function displaydata(data) {
      // Création Obj "owner" pour pouvoir récupérer et éviter de taper toutes les informations
      const owner = {
          name:data[0].name,
          surname:data[0].surname,
          email:data[0].email,
          photo:data[0].photo,
          password:data[0].password,
          link_git:data[0].link_git,
          promo:data[0].promo
      };
      // Création des élements qui vont composer la page d'accueil
      const clickable = document.createElement("div");
      const menuburger = document.createElement("div");
      const navbar = document.getElementById("navbar");
      const profil_img = document.createElement("img");
      const texte = document.createElement("p");
      const icon_battery = document.createElement("i");
      const icon_wifi = document.createElement("i");
      const person = "Prénom/Nom: "+owner.name+", "+owner.surname+"<br>Email: "+owner.email+"<br>Promo: "+owner.promo+"<br><i class='fa fa-github' style='font-size:24px'></i><a href='"+owner.link_git+"'> Mon Git</a><br><a href='setting.html'>⚙ Setting</a>";
      
      // "paramétrage" des éléments en précisant les informations de type src,id,title...
      profil_img.id = "photo_profil";
      profil_img.src = owner.photo;
      profil_img.title = "Cliquez pour Voir Profil"

      texte.innerHTML = person;
      menuburger.id ="menuburger";
      icon_battery.className = "fa fa-battery-full";
      icon_wifi.className = "fa fa-wifi";
      clickable.id = "img_click";
      
      // ajout des élments dans les divs parents attribués
      menuburger.appendChild(texte);
      navbar.appendChild(profil_img);
      block_menu.appendChild(menuburger); // div block_menu dans le code HTML
      navbar.appendChild(icon_battery);
      navbar.appendChild(icon_wifi);

      // fonction affiche/masque le menuBurder lors de l'appui sur l'img en haut à gauche
      profil_img.onclick = function(){var x = document.getElementById("menuburger");if (x.style.display === "none") {x.style.display = "block";} else {x.style.display = "none";}};
  }
}