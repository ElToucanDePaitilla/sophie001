//####################################################################################
//RECUPERATION DES API
//####################################################################################

const apiUrl = "http://localhost:5678/api";
const getWorksUrl = `${apiUrl}/works`;
const getCategoriesUrl = `${apiUrl}/categories`;
const loginUrl = `${apiUrl}/users/login`;
const deleteWorksUrl = `${apiUrl}/works`;


//####################################################################################
//RECUPERATION DU DOM
//####################################################################################

document.addEventListener("DOMContentLoaded", async function () {
console.log("Document is ready");

//####################################################################################
//RECUPERATION DES CATEGORIES DEPUIS l'API
//####################################################################################

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
//CREATION DE LA GALERIE
//####################################################################################

  //Vidage du container .gallery de tous ses projets présents
  function clearGallery() {
    const galleryDiv = document.querySelector(".gallery"); // Sélectionner la div .gallery.
    while (galleryDiv.firstChild) {
      galleryDiv.removeChild(galleryDiv.firstChild); // Supprimer chaque enfant de la galerie
    }
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
      works.forEach((project) => {
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
  fetchCategories().then((categories) => {
    createFilterButtons(categories);
  });

  fetchAndDisplayWorks();

//####################################################################################
// BOUTONS FILTRES
//####################################################################################
 
//Fonction pour créer les boutons de filtrage des projets.
  function createFilterButtons(categories) {
    const filterButtonsContainer = document.getElementById(
      "filter-buttons-container"
    );

    // Créer et ajouter le bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.classList.add("active"); // Ajouter une classe pour le style
    allButton.style.backgroundColor = "#1d6154";
    allButton.style.color = "white";
    allButton.dataset.categoryId = "all";
    filterButtonsContainer.appendChild(allButton);

    // Créer et ajouter les autres boutons de catégorie
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.dataset.categoryId = category.id;
      filterButtonsContainer.appendChild(button);
    });

    // Ajouter des écouteurs d'événements pour les boutons
    const buttons = filterButtonsContainer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", handleFilterClick);
    });
  }

  // Fonction pour gérer les clics sur les boutons de filtrage.
  function handleFilterClick(event) {
    const categoryId = event.target.dataset.categoryId;
    const buttons = document.querySelectorAll(
      "#filter-buttons-container button"
    );

    // Mettre à jour le style des boutons
    buttons.forEach((button) => {
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
//FORMULAIRE DE CONNEXION
//####################################################################################

  // Vérification de l'authentification
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated === "true") {
    // Appliquer les changements de style après la redirection
    document.querySelector(".title-mode-edition .opening-modal").style.display =
      "flex";
    document.getElementById("link-login").style.display = "none";
    document.getElementById("bandeau-edition").style.display = "flex";
    document.getElementById("link-logout").style.display = "flex";
  } else {
    localStorage.removeItem("isAuthenticated");
  }

  //Fonction pour gérer la déconnexion
  function handleLogout() {
    localStorage.removeItem("authToken"); // Supprimer le token
    localStorage.removeItem("isAuthenticated"); // Supprimer l'état d'authentification
    window.location.href = "login.html"; // Rediriger vers la page de connexion
  }

  // Ajouter un écouteur d'événement au bouton de déconnexion
  const logoutButton = document.getElementById("link-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut du lien
      handleLogout(); // Appeler la fonction de déconnexion
    });
  }

//####################################################################################
//FENETRE MODALE - GALERIE PHOTO
//####################################################################################

  function initializeModal() {
    //Récupération des éléments du DOM
    const modal = document.getElementById("modal");
    const openModalButton = document.getElementById("open-modal-button");
    const closeModalButton = document.getElementById("close-modal-button");
    //const returnModalButton = document.getElementById("return-modal-button");

    // ouvrir la modale
    openModalButton.addEventListener("click", function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut
      modal.style.display = "block";
    });

    // fermer la modale
    closeModalButton.addEventListener("click", function (event) {
      event.preventDefault(); // Empêcher le comportement par défaut
      modal.style.display = "none";
    });

    // fermer la modale en cliquant en dehors de celle-ci
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  // Appel de la fonction pour initialiser la modale
  initializeModal();

  // Fonction pour vider #delete-gallery de tous ses éléments
  function clearDeleteGallery() {
    const deleteGallery = document.getElementById("delete-gallery");
    while (deleteGallery.firstChild) {
      deleteGallery.removeChild(deleteGallery.firstChild);
    }
  }

  // Fonction pour importer les works depuis l'API
  async function fetchWorks() {
    try {
      const response = await fetch(getWorksUrl);
      const works = await response.json();
      return works.map((work) => ({ id: work.id, imageUrl: work.imageUrl }));
    } catch (error) {
      console.error("Erreur lors de la récupération des works:", error);
      return [];
    }
  }

  // Fonction pour afficher toutes les imageUrl dans #delete-gallery
  async function displayWorksInGallery() {
    const works = await fetchWorks();
    const deleteGallery = document.getElementById("delete-gallery");
    works.forEach((work) => {
      const elementFusionne = document.createElement("div");
      elementFusionne.id = "element-fusionne";
      elementFusionne.dataset.id = work.id; // Stocker l'ID de l'objet

      const img = document.createElement("img");
      img.className = "images";
      img.src = work.imageUrl;
      img.alt = "Image";

      const fondIcone = document.createElement("div");
      fondIcone.className = "fond-icone";

      const icon = document.createElement("i");
      icon.className = "fa-solid fa-trash-can icone";
      icon.style.color = "#ffffff";

      fondIcone.appendChild(icon);
      elementFusionne.appendChild(img);
      elementFusionne.appendChild(fondIcone);
      deleteGallery.appendChild(elementFusionne);

      // Ajouter l'événement de clic pour supprimer l'objet
      elementFusionne.addEventListener("click", async (event) => {
        event.preventDefault(); // Empêcher le comportement par défaut
        await deleteWork(work.id, elementFusionne);
      });
    });
  }

  // Fonction pour vérifier l'authentification et supprimer un work via l'API
  async function deleteWork(id, element) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Erreur : Accès non autorisé à l'API 'delete'");
      return;
    }

    try {
      const response = await fetch(`${deleteWorksUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`L'objet avec l'id ${id} a été supprimé.`);
        element.remove(); // Supprimer l'élément de la galerie
      } else {
        console.error(
          `Erreur de suppression pour l'objet avec l'id ${id}:`,
          response.status
        );
      }
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'objet avec l'id ${id}:`,
        error
      );
    }
  }

  // Appeler les fonctions pour initialiser la galerie
  clearDeleteGallery();
  displayWorksInGallery();

//####################################################################################
//FENETRE MODALE - AJOUT PHOTO
//####################################################################################

// Fonction pour initialiser les écouteurs d'événements
function initializeAddPhotoButton() {
  // Sélectionner le bouton avec l'ID 'ajouter-une-photo'
  const addPhotoButton = document.getElementById("ajouter-une-photo");

  if (addPhotoButton) {
    // Ajouter un écouteur d'événements pour le clic
    addPhotoButton.addEventListener("click", function() {
      showReturnButton(); // Afficher le bouton de retour
      hideGalleryPhotoTitle(); // Cacher le titre de la galerie photo
      displayAddPhotoTitle(); // Afficher le titre d'ajout de photo
      hideDeleteGallery(); // Cacher la galerie de suppression
      hidePhotoAddButton();// Cacher le bouton "ajouter-une-photo"
      displayCreaValidationButton()// Afficher le bouton "Valider"
      displayPhotoContainer();// Afficher le container ajout photo
    });
  } else {
    console.error("Le bouton 'Ajouter une photo' n'a pas été trouvé.");
  }
}

// Appeler la fonction pour initialiser les écouteurs d'événements
initializeAddPhotoButton(); // Initialiser les écouteurs d'événements

// Fonction pour afficher le bouton de retour lorsque le bouton "Ajouter une photo" est cliqué
function showReturnButton() {
  const returnButton = document.getElementById("return-modal-button");
  if (returnButton) {
    returnButton.style.visibility = "visible";
  } else {
    console.error("Le bouton de retour n'a pas été trouvé.");
  }
}

// Fonction pour masquer le titre "Galerie Photo"
function hideGalleryPhotoTitle() {
  const galleryPhotoTitle = document.getElementById("titre-galerie-photo");
  if (galleryPhotoTitle) {
    galleryPhotoTitle.style.display = "none";
  } else {
    console.error("Le titre 'Galerie photo' n'a pas été trouvé.");
  }
}

// Fonction pour afficher le titre "Ajout photo"
function displayAddPhotoTitle() {
  const addPhotoTitle = document.getElementById("titre-ajout-photo");
  if (addPhotoTitle) {
    addPhotoTitle.style.display = "flex";
  } else {
    console.error("Le titre 'Ajout photo' n'a pas été trouvé.");
  }
}

// Fonction pour masquer la galerie exposant les photos à supprimer
function hideDeleteGallery() {
  const deleteGallery = document.getElementById("delete-gallery");
  if (deleteGallery) {
    deleteGallery.style.display = "none";
  } else {
    console.error("Le 'delete-gallery' n'a pas été trouvé.");
  }
}

// Fonction pour masquer le bouton "Ajouter une photo"
function hidePhotoAddButton() {
  const photoAddButton = document.getElementById("ajouter-une-photo");
  if (photoAddButton) {
    photoAddButton.style.display = "none";
  } else {
    console.error("Le bouton 'ajouter-une-photo' n'a pas été trouvé.");
  }
}

// Fonction pour afficher le container contenant tous les éléments principaux de la fenêtre modale
function displayPhotoContainer() {
  const photoContainer = document.getElementById("container-ajout-photo");
  if (photoContainer) {
    photoContainer.style.display = "flex";
  } else {
    console.error("'container-ajout-photo' n'a pas été trouvé.");
  }
}

// Fonction pour afficher le bouton "Valider"
function displayCreaValidationButton() {
  const creaValidationButton = document.getElementById("bouton-valider-crea");
  if (creaValidationButton) {
    creaValidationButton.style.display = "flex";
  } else {
    console.error("Le bouton 'Valider' n'a pas été trouvé.");
  }
}

//Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
  const apiUrl = "http://localhost:5678/api";
  const getCategoriesUrl = `${apiUrl}/categories`;

  try {
      const response = await fetch(getCategoriesUrl);
      if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      const categories = await response.json();
      console.log("Catégories récupérées avec succès :", categories); // Log pour vérifier les données récupérées
      return categories;
  } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      return [];
  }
}

//Fonction pour créer les éléments <option> et les ajouter au <select>
async function populateCategoryOptions() {
  const categories = await fetchCategories();
  const categorySelect = document.getElementById("categorie");

  if (categorySelect) {
      // Vider le <select> avant d'ajouter de nouvelles options
      categorySelect.innerHTML = '<option value="" disabled selected>Sélectionnez une catégorie</option>';

      categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
      });
  } else {
      console.error("L'élément <select> avec l'ID 'categorie' n'a pas été trouvé.");
  }
}

// Appel de la fonction pour remplir les options de catégories
populateCategoryOptions();


//####################################################################################
//UPLOAD - AJOUT PHOTO - GESTION DU BOUTON
//####################################################################################

  // Appel de la fonction pour configurer le bouton `return-modal-button`
  setupReturnModalButton();


// Fonction pour configurer le bouton `return-modal-button` et gérer l'ouverture de la modale
function setupReturnModalButton() {
  // Vérifier si l'information pour ouvrir la modale est stockée dans le localStorage
  const openModal = localStorage.getItem('openModal');
  if (openModal === 'true') {
    // Supprimer l'information du localStorage
    localStorage.removeItem('openModal');
    // Ouvrir la modale
    console.log("Ouverture de la modale après redirection");
    document.getElementById('modal').style.display = 'block';
  }

  // Fonction pour gérer le clic sur le bouton `return-modal-button`
  function handleReturnModalButtonClick(event) {
    event.preventDefault();
    // Stocker une information dans le localStorage pour indiquer que la modale doit être ouverte
    localStorage.setItem('openModal', 'true');
    // Rediriger vers index.html
    console.log("Redirection vers index.html avec la modale à ouvrir");
    window.location.href = 'index.html';
  }

  // Écouteur d'événement pour le bouton `return-modal-button`
  const returnModalButton = document.getElementById('return-modal-button');
  if (returnModalButton) {
    returnModalButton.addEventListener('click', handleReturnModalButtonClick);
  } else {
    console.error("Le bouton return-modal-button n'a pas été trouvé.");
  }
}

// Fonction upload image et autres champs avec contrôle des conditions et message d'erreur
function initializePhotoUpload() {
  // Afficher les messages d'erreur
  const errorElement = document.createElement('p');
  errorElement.id = 'upload-error';
  errorElement.style.color = 'red';
  errorElement.style.display = 'none';
  errorElement.style.position = 'relative'; // Pour positionner relativement à son parent
  errorElement.style.top = '-10px'; // Positionner au-dessus de #fenetre-ajout-photo
  errorElement.style.textAlign = 'center'; // Centrer le texte horizontalement

  // Insérer l'élément d'erreur avant #fenetre-ajout-photo
  const fenetreAjoutPhoto = document.getElementById('fenetre-ajout-photo');
  fenetreAjoutPhoto.parentNode.insertBefore(errorElement, fenetreAjoutPhoto);

  function handlePhotoUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpg,.png';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 1 * 1024 * 1024) {
          errorElement.textContent = 'Le fichier doit faire moins de 1 Mo';
          errorElement.style.display = 'block';
          return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.alt = 'Image uploadée';
          img.style.height = '100%';
          img.style.width = 'auto';
          img.style.display = 'block';
          img.style.margin = 'auto';

          fenetreAjoutPhoto.innerHTML = ''; // Vider le contenu existant
          fenetreAjoutPhoto.appendChild(img); // Ajouter l'image

          // Masquer le message d'erreur
          errorElement.style.display = 'none';

          // Appel de la fonction pour vérifier l'état du formulaire après le téléchargement de l'image
          checkAddPhotoForm();
        }
        reader.readAsDataURL(file);
      } else {
        errorElement.textContent = 'Le fichier doit être au format .jpg ou .png';
        errorElement.style.display = 'block';
      }
    });

    fileInput.click();
  }

  document.getElementById('bouton-plus-ajouter-photo').addEventListener('click', function() {
    // Réinitialiser le message d'erreur à chaque clic
    errorElement.style.display = 'none';
    handlePhotoUpload();
  });























  
// Fonction pour vérifier si le formulaire d'ajout de photo est valide
function checkAddPhotoForm() {
  const imageUploaded = document.querySelector('#fenetre-ajout-photo img'); // Vérifie si une image est présente
  const title = document.querySelector('input[name="crea-titre-projet"]').value.trim(); // Vérifie si le titre est non vide
  const category = document.querySelector('select[name="categorie"]').value; // Vérifie si une catégorie est sélectionnée
  const validateButton = document.getElementById('bouton-valider-crea');

  // Conditions pour vérifier que tous les champs sont valides
  const isImageValid = imageUploaded !== null;
  const isTitleValid = title.length > 0;
  const isCategoryValid = category !== '';

  if (isImageValid && isTitleValid && isCategoryValid) {
    validateButton.style.backgroundColor = '#1d6154';
    validateButton.disabled = false; // Rendre le bouton "clicable"
    
    console.log("Le bouton 'Valider' est maintenant activé et cliquable."); // Log pour indiquer que le bouton est activé
    console.log("Valeur de validateButton.disabled :", validateButton.disabled); // Log pour afficher la valeur de disabled

    validateButton.addEventListener('mouseover', handleMouseOver);
    validateButton.addEventListener('mouseout', handleMouseOut);

  } else {
    validateButton.style.backgroundColor = '#A7A7A7';
    validateButton.disabled = true; // Désactiver le bouton

    // Supprimer les écouteurs d'événements si le bouton n'est pas cliquable
    validateButton.removeEventListener('mouseover', handleMouseOver);
    validateButton.removeEventListener('mouseout', handleMouseOut);
  }
}

// Fonction pour gérer le survol (mouseover) du bouton
function handleMouseOver() {
  this.style.backgroundColor = '#0E2F28';
}

// Fonction pour gérer la sortie du survol (mouseout) du bouton
function handleMouseOut() {
  this.style.backgroundColor = '#1d6154';
}

// Ajouter des écouteurs d'événements pour vérifier le formulaire à chaque changement
document.querySelector('input[name="crea-titre-projet"]').addEventListener('input', checkAddPhotoForm);
document.querySelector('select[name="categorie"]').addEventListener('change', checkAddPhotoForm);
document.querySelector('#fenetre-ajout-photo').addEventListener('DOMSubtreeModified', checkAddPhotoForm); // Surveiller les changements dans la div d'ajout de photo

}

// Appeler la fonction pour initialiser la gestion du téléchargement de photo
initializePhotoUpload();


//####################################################################################
//POST VERS L'API
//####################################################################################


/*

//Envoyer la requête POST

const postWorksUrl = "http://localhost:5678/api/works";

// Fonction pour récupérer l'ID le plus élevé des projets
async function fetchHighestProjectId() {
  try {
    const response = await fetch(getWorksUrl);
    const projects = await response.json();
    const highestId = projects.reduce((max, project) => project.id > max ? project.id : max, 0);
    return highestId;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return null;
  }
}




    // Fonction pour gérer la soumission du formulaire
    function handleFormSubmit(event) {
      event.preventDefault();
      console.log("Formulaire soumis");
  
      const title = document.querySelector('input[name="crea-titre-projet"]').value.trim();
      const categoryId = document.querySelector('select[name="categorie"]').value;
      const imageInput = document.querySelector('#project-image').files[0];
  
      if (!title || !categoryId || !imageInput) {
        console.error("Veuillez remplir tous les champs du formulaire.");
        return;
      }
  
      console.log("Titre:", title);
      console.log("Catégorie ID:", categoryId);
      console.log("Image sélectionnée:", imageInput);
    }
  
    // Ajouter l'écouteur d'événement au bouton "Valider"
    const validateButton = document.getElementById("bouton-valider-crea");
    if (validateButton) {
      validateButton.addEventListener("click", handleFormSubmit);
      console.log("Écouteur d'événement ajouté au bouton 'Valider'");
    } else {
      console.error("Le bouton 'Valider' n'a pas été trouvé.");
    }



    */













});
