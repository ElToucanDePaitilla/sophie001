//####################################################################################
//RECUPERATION DES API
const apiUrl = "http://localhost:5678/api";
const getWorksUrl = `${apiUrl}/works`;
const getCategoriesUrl = `${apiUrl}/categories`;
const loginUrl = `${apiUrl}/users/login`;

//####################################################################################
//RECUPERATION DU DOM
document.addEventListener("DOMContentLoaded", async function () {
  console.log("Document is ready");

//links depuis login.html vers indexedDB.html



















  // Fonction pour récupérer les catégories depuis l'API.
  async function fetchCategories() {
    try {
      const response = await fetch(getCategoriesUrl);
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      return [];
    }
  }
//####################################################################################
//BOUTONS FILTRES

  //Fonction pour créer les boutons de filtrage des projets.
  function createFilterButtons(categories) {
    const filterButtonsContainer = document.getElementById("filter-buttons-container");

    // Créer et ajouter le bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("active"); // Ajouter une classe pour le style
    allButton.style.backgroundColor = "#1d6154";
    allButton.style.color = "white";
    allButton.dataset.categoryId = "all";
    filterButtonsContainer.appendChild(allButton);

    // Créer et ajouter les autres boutons de catégorie
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      filterButtonsContainer.appendChild(button);
    });

    // Ajouter des écouteurs d'événements pour les boutons
    const buttons = filterButtonsContainer.querySelectorAll("button");
    buttons.forEach(button => {
      button.addEventListener("click", handleFilterClick);
    });
  }

  // Fonction pour gérer les clics sur les boutons de filtrage.
  function handleFilterClick(event) {
    const categoryId = event.target.dataset.categoryId;
    const buttons = document.querySelectorAll("#filter-buttons-container button");
    
    // Mettre à jour le style des boutons
    buttons.forEach(button => {
      if (button === event.target) {
        button.classList.add("active");
        button.style.backgroundColor = "#1d6154";
        button.style.color = "white";
      } else {
        button.classList.remove("active");
        button.style.backgroundColor = "white";
        button.style.color = "#1d6154";
      }
    });

    // Filtrer les projets en fonction de la catégorie sélectionnée
    fetchAndDisplayWorks(categoryId);
  }


//####################################################################################
//GALLERY

  //Vidage du container .gallery de tous ses projets présents
  function clearGallery() {
    const galleryDiv = document.querySelector(".gallery"); // Sélectionner la div .gallery.
    while (galleryDiv.firstChild) {
      galleryDiv.removeChild(galleryDiv.firstChild); // Supprimer chaque enfant de la galerie
    }
    console.log("Gallery cleared");
  }

  // Créer les éléments de la galerie Projets.
  function createGalleryProject(project) {
    if (!project || !project.imageUrl || !project.title) {
      console.error("Projet invalide:", project);
      return document.createTextNode("Projet invalide");
    }
    const figure = document.createElement("figure"); //C'est le conteneur formant project; nous conservons le nom d'origine pour que le CSS continue de s'appliquer.
    const img = document.createElement("img");
    img.src = project.imageUrl; //C'est l'image du projet; nous conservons le nom d'origine pour que le CSS continue de s'appliquer.
    img.alt = project.title; //C'est le texte de remplacement de l'image en cas de défaut d'affichage.
    const figcaption = document.createElement("figcaption"); // C'est le titre du projet; nous conservons le nom d'origine pour que le CSS continue de s'appliquer.
    figcaption.textContent = project.title;
    figure.appendChild(img); //Créé l'enfant "image du projet" dans la balise parent "figure".
    figure.appendChild(figcaption); //Créé l'enfant "titre du projet" dans la balise parent "figure".
    return figure; //permet de renvoyer l'élément HTML complet créé par la fonction createGalleryProject.
  }

    // Fonction pour récupérer les projets depuis l'API, puis les ajouter dans la galerie
  async function fetchAndDisplayWorks(categoryId = "all") {
    try {
      // Récupération des works depuis l'API.
      const response = await fetch(getWorksUrl);
      const works = await response.json();
      const galleryDiv = document.querySelector(".gallery");
      clearGallery();

      // Utilisation d'une boucle for pour créer et ajouter les éléments de la galerie.
      works.forEach(project => {
        if (categoryId === "all" || project.categoryId == categoryId) {
          const galleryProject = createGalleryProject(project);
          galleryDiv.appendChild(galleryProject);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  // Appel des fonctions pour récupérer les catégories et créer les boutons.
  fetchCategories().then(categories => {
    createFilterButtons(categories);
  });

  fetchAndDisplayWorks();
});
