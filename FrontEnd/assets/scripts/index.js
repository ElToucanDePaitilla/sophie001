//####################################################################################
//RECUPERATION DES API

const apiUrl = "http://localhost:5678/api";
const getWorksUrl = `${apiUrl}/works`;
const getCategoriesUrl = `${apiUrl}/categories`;
const loginUrl = `${apiUrl}/users/login`;
const deleteWorksUrl = `${apiUrl}/works`;

//####################################################################################
//RECUPERATION DU DOM

document.addEventListener("DOMContentLoaded", async function () {
  console.log("Document is ready");

  //####################################################################################
  //RECUPERATION DES CATEGORIES DEPUIS l'API

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
  //BOUTONS FILTRES

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
          localStorage.setItem("authToken", data.token); // NEW/NEW/NEW : Stocker le token
          ouvertureModeEdition(data.token); // Passez le token à la fonction si nécessaire
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

  // Fonction pour ouvrir le mode édition , gestion de l'authentification réussie
  function ouvertureModeEdition(token) {
    console.log("Mode édition ouvert avec le token:", token);

    // Stocker un indicateur dans localStorage
    localStorage.setItem("isAuthenticated", "true");

    // Rediriger l'utilisateur vers la page index.html
    window.location.href = "index.html";
  }

  // !!!!!!!!!!! Vérification de l'authentification

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (isAuthenticated === "true") {
    // Appliquer les changements de style après la redirection
    document.querySelector(".title-mode-edition .opening-modal").style.display =
      "flex";
    document.getElementById("link-login").style.display = "none";
    document.getElementById("bandeau-edition").style.display = "flex";
    document.getElementById("link-logout").style.display = "flex";

    // Supprimer l'indicateur de localStorage
    localStorage.removeItem("isAuthenticated");
  }

  //####################################################################################
  //Modale

  function initializeModal() {
    //Récupération des éléments du DOM
    const modal = document.getElementById("modal");
    const openModalButton = document.getElementById("open-modal-button");
    const closeModalButton = document.getElementById("close-modal-button");
    //const returnModalButton = document.getElementById("return-modal-button");

    //Fonction pour ouvrir la modale
    openModalButton.addEventListener("click", function () {
      modal.style.display = "block";
    });

    //Fonction pour fermer la modale
    closeModalButton.addEventListener("click", function () {
      modal.style.display = "none";
    });

    //Fermer la modale en cliquant en dehors de celle-ci
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });

    // Fonction pour retourner en arrière = afficher / désafficher le contenu initial .... ?
  }

  // Appel de la fonction pour initialiser la modale
  initializeModal();

  //####################################################################################
  //GALERIE DELETE
  //####################################################################################

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
      elementFusionne.dataset.id = work.id; // NEW/NEW/NEW : Stocker l'ID de l'objet

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
      elementFusionne.addEventListener("click", async () => {
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
        element.remove(); // NEW/NEW/NEW : Supprimer l'élément de la galerie
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
});
