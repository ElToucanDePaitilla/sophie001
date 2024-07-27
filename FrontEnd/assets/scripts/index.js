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

//##################################################################################
//CREATION DE LA GALERIE DANS LAQUELLE S'AFFICHERONT LES PROJETS

  //Vidage du container .gallery de tous ses projets présents
  function clearGallery() {
    const galleryDiv = document.querySelector(".gallery"); // Sélectionner la div .gallery.
    /*galleryDiv.innerHTML = "";*/

    while (galleryDiv.firstChild) {
      galleryDiv.removeChild(galleryDiv.firstChild); // Supprimer chaque enfant de la galerie
    }

    console.log("Gallery cleared");
  }
  clearGallery();

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
  async function fetchAndDisplayWorks() {
    try {
      // Récupération des works depuis l'API.
      const response = await fetch(getWorksUrl);
      const works = await response.json();
      const galleryDiv = document.querySelector(".gallery");
      clearGallery();
      // Utilisation d'une boucle for pour créer et ajouter les éléments de la galerie.
      for (let i = 0; i < works.length; i++) {
        const project = works[i];
        const galleryProject = createGalleryProject(project);
        galleryDiv.appendChild(galleryProject);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  //####################################################################################
  //CREATION DE LA GALERIE DANS LAQUELLE S'AFFICHERONT LES BOUTONS

  // Fonction pour récupérer les catégories depuis l'API et créer les boutons
  async function fetchAndDisplayCategories() {
    try {
      console.log("Fetching categories..."); // Log avant la requête
      const response = await fetch(getCategoriesUrl);
      console.log("API response status:", response.status); // Log pour le statut de la réponse
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const categories = await response.json();
      console.log("API response:", response); // Log pour la réponse brute de l'API
      console.log("Categories fetched:", categories); // Log des catégories récupérées
      createCategoryButtons(categories);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  }

  //Log pour vérifier que la fonction est bien appelée
  console.log("Calling fetchAndDisplayCategories");
  fetchAndDisplayCategories();
  fetchAndDisplayWorks();










}); // Fin de document.addEventListener("DOMContentLoaded", async function () {
