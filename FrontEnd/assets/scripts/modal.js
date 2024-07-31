
/*
  document.addEventListener("DOMContentLoaded", async function () {
    console.log("Document is ready");
  
    // NEW/NEW/NEW : Fonction pour vider le contenu de la div avec l'ID "galerie-element-to-delete"
    function clearGalleryElementToDelete() {
      const galleryEtD = document.getElementById("gallery-element-to-delete");
      if (galleryEtD) {
        console.log("Element found:", galleryEtD); // Log si l'élément est trouvé
        while (galleryEtD.firstChild) {
          console.log("Removing child:", galleryEtD.firstChild); // Log avant de supprimer chaque enfant
          galleryEtD.removeChild(galleryEtD.firstChild); // Supprimer chaque enfant de la galerie
        }
        console.log("All children removed."); // Log après la suppression de tous les enfants
      } else {
        console.error("Element with ID 'gallery-element-to-delete' not found."); // Log si l'élément n'est pas trouvé
      }
    }
  
    // Vérifier que l'élément existe après le chargement du DOM
    window.addEventListener("load", function() {
      clearGalleryElementToDelete(); // Appel de la fonction pour vider le contenu de la div
    });
  
    // Autres fonctions...
  });

*/
/*
  // Créer les éléments de la galerie Projets.
  function createGalleryProjectToDelete(project) {
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
          const galleryProject = createGalleryProjectToDelete(project);
          galleryDiv.appendChild(galleryProject);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

fetchCategories()
  fetchAndDisplayWorks();
*/


