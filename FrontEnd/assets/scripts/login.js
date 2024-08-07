const apiUrl = "http://localhost:5678/api";
const getWorksUrl = `${apiUrl}/works`;
const getCategoriesUrl = `${apiUrl}/categories`;
const loginUrl = `${apiUrl}/users/login`;
const deleteWorksUrl = `${apiUrl}/works`; 
 
 
 // Gérer la soumission du formulaire de connexion
 function handleLoginFormSubmit(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorElement = document.getElementById("login-error");

  // Fonction pour envoyer la requête de connexion
  async function loginUser(email, password) {
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); //Stocker le token
        localStorage.setItem("isAuthenticated", "true");            // Rediriger l'utilisateur vers la page index.html
        window.location.href = "index.html";
      } else {
        errorElement.style.display = "block";
        console.error("Erreur de connexion:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  }

  // Appel de la fonction loginUser avec les valeurs du formulaire
  loginUser(email, password);
}

  // Ajout de l'écouteur d'événement de soumission au formulaire
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginFormSubmit);
  } else {
    /*console.error("Le formulaire de connexion n'a pas été trouvé."); bug à corriger ???????????????*/
  }

















  



//--------------------------------------------------------------------------------------------------------------------
//NEW TEST BOUTON FLECHE RETOUR
/*



// Fonction pour rediriger vers la fenêtre modale "Galerie photo"
function handleReturnToGalleryClick() {
  const gallerySection = document.getElementById('delete-gallery'); // Section de la galerie photo
  const addPhotoSection = document.getElementById('container-ajout-photo'); // Section de l'ajout photo
  const returnButton = document.getElementById('return-modal-button');
  const addPhotoTitle = document.getElementById('titre-ajout-photo');
  const galleryTitle = document.getElementById('titre-galerie-photo');
  const addPhotoButton = document.getElementById('ajouter-une-photo');
  const validateButton = document.getElementById('bouton-valider-crea');

  // Afficher la section de la galerie et cacher la section d'ajout photo
  gallerySection.style.display = 'flex';
  addPhotoSection.style.display = 'none';

  // Cacher le bouton retour
  returnButton.style.visibility = 'hidden';

  // Afficher le titre de la galerie photo et cacher le titre d'ajout de photo
  galleryTitle.style.display = 'flex';
  addPhotoTitle.style.display = 'none';

  // Afficher le bouton "Ajouter une photo" et cacher le bouton "Valider"
  addPhotoButton.style.display = 'flex';
  validateButton.style.display = 'none';
}

// Ajout de l'écouteur d'événement au bouton retour
document.getElementById('return-modal-button').addEventListener('click', handleReturnToGalleryClick);


// Fonction pour gérer l'affichage de la modale "Ajouter une photo"
function initializeAddPhotoButton() {
  const addPhotoButton = document.getElementById("ajouter-une-photo");

  if (addPhotoButton) {
      addPhotoButton.addEventListener("click", function() {
          showReturnButton();
          hideGalleryPhotoTitle();
          displayAddPhotoTitle();
          hideDeleteGallery();
          hidePhotoAddButton();
          displayCreaValidationButton();
          displayPhotoContainer();
      });
  } else {
      console.error("Le bouton 'Ajouter une photo' n'a pas été trouvé.");
  }
}

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

// Fonction pour rediriger vers la fenêtre modale "Galerie photo"
function handleReturnToGalleryClick() {
  const gallerySection = document.getElementById('delete-gallery'); // Section de la galerie photo
  const addPhotoSection = document.getElementById('container-ajout-photo'); // Section de l'ajout photo
  const returnButton = document.getElementById('return-modal-button');
  const addPhotoTitle = document.getElementById('titre-ajout-photo');
  const galleryTitle = document.getElementById('titre-galerie-photo');
  const addPhotoButton = document.getElementById('ajouter-une-photo');
  const validateButton = document.getElementById('bouton-valider-crea');

  // Afficher la section de la galerie et cacher la section d'ajout photo
  gallerySection.style.display = 'flex';
  addPhotoSection.style.display = 'none';

  // Cacher le bouton retour
  returnButton.style.visibility = 'hidden';

  // Afficher le titre de la galerie photo et cacher le titre d'ajout de photo
  galleryTitle.style.display = 'flex';
  addPhotoTitle.style.display = 'none';

  // Afficher le bouton "Ajouter une photo" et cacher le bouton "Valider"
  addPhotoButton.style.display = 'flex';
  validateButton.style.display = 'none';
}

// Ajout de l'écouteur d'événement au bouton retour
document.getElementById('return-modal-button').addEventListener('click', handleReturnToGalleryClick);

// Initialiser les écouteurs d'événements
initializeAddPhotoButton();


*/