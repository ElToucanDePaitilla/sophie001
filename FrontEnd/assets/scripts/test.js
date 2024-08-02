document.addEventListener("DOMContentLoaded", async function () {
  console.log("Document is ready");

  // URL de l'API
  const apiUrl = "http://localhost:5678/api";
  const getWorksUrl = `${apiUrl}/works`;
  const deleteWorksUrl = `${apiUrl}/works`;

  // Fonction pour récupérer les projets
  async function fetchWorks() {
      try {
          const response = await fetch(getWorksUrl);
          const works = await response.json();
          console.log("Works:", works);

          // NEW/NEW/NEW : Inclure les URLs et les IDs des projets
          const imageUrls = works.map(work => ({ url: work.imageUrl, id: work.id }));
          console.log("Image URLs:", imageUrls);
          return imageUrls;
      } catch (error) {
          console.error("Erreur lors de la récupération des imageUrls:", error);
          return [];
      }
  }

  // Fonction pour vider la galerie
  function clearGallery() {
      const gallery = document.getElementById('delete-gallery');
      while (gallery.firstChild) {
          gallery.removeChild(gallery.firstChild);
      }
      console.log("#delete-gallery has been cleared");
  }

  // Fonction pour créer les éléments de la galerie
  function createGalleryItems(imageUrls) {
      const gallery = document.getElementById('delete-gallery');
      imageUrls.forEach(item => {
          const elementFusionne = document.createElement('div');
          elementFusionne.id = 'element-fusionne';
          elementFusionne.dataset.id = item.id; // NEW/NEW/NEW : Ajout de l'ID du projet

          const img = document.createElement('img');
          img.className = 'images';
          img.src = item.url;
          img.alt = 'Image';

          const fondIcone = document.createElement('div');
          fondIcone.className = 'fond-icone';

          const icon = document.createElement('i');
          icon.className = 'fa-solid fa-trash-can icone';
          icon.style.color = '#ffffff';

          fondIcone.appendChild(icon);
          elementFusionne.appendChild(img);
          elementFusionne.appendChild(fondIcone);
          gallery.appendChild(elementFusionne);

          // NEW/NEW/NEW : Ajout de l'écouteur d'événement pour supprimer l'élément
          fondIcone.addEventListener('click', async function () {
              const id = elementFusionne.dataset.id;
              try {
                  const response = await fetch(`${deleteWorksUrl}/${id}`, { method: 'DELETE' });
                  if (response.ok) {
                      console.log(`Project with ID ${id} deleted successfully.`);
                      elementFusionne.remove(); // NEW/NEW/NEW : Suppression de l'élément du DOM
                  } else {
                      console.error(`Failed to delete project with ID ${id}.`);
                  }
              } catch (error) {
                  console.error(`Error deleting project with ID ${id}:`, error);
              }
          });

          console.log("Created element:", elementFusionne);
      });
  }

  // Fonction pour initialiser la galerie
  async function initGallery() {
      const imageUrls = await fetchWorks();
      clearGallery();
      createGalleryItems(imageUrls);
  }

  initGallery();
});




















/*Version 00 qui fonctionne



document.addEventListener("DOMContentLoaded", async function () {
    console.log("Document is ready");

    // URL de l'API
    const apiUrl = "http://localhost:5678/api";
    const getWorksUrl = `${apiUrl}/works`;
    const deleteWorksUrl = `${apiUrl}/works`;

    // Fonction pour récupérer les projets
    async function fetchWorks() {
        try {
            const response = await fetch(getWorksUrl);
            const works = await response.json();
            console.log("Works:", works);

            // NEW/NEW/NEW : Inclure les URLs et les IDs des projets
            const imageUrls = works.map(work => ({ url: work.imageUrl, id: work.id }));
            console.log("Image URLs:", imageUrls);
            return imageUrls;
        } catch (error) {
            console.error("Erreur lors de la récupération des imageUrls:", error);
            return [];
        }
    }

    // Fonction pour vider la galerie
    function clearGallery() {
        const gallery = document.getElementById('delete-gallery');
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
        console.log("#delete-gallery has been cleared");
    }

    // Fonction pour créer les éléments de la galerie
    function createGalleryItems(imageUrls) {
        const gallery = document.getElementById('delete-gallery');
        imageUrls.forEach(item => {
            const elementFusionne = document.createElement('div');
            elementFusionne.id = 'element-fusionne';
            elementFusionne.dataset.id = item.id; // NEW/NEW/NEW : Ajout de l'ID du projet

            const img = document.createElement('img');
            img.className = 'images';
            img.src = item.url;
            img.alt = 'Image';

            const fondIcone = document.createElement('div');
            fondIcone.className = 'fond-icone';

            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-trash-can icone';
            icon.style.color = '#ffffff';

            fondIcone.appendChild(icon);
            elementFusionne.appendChild(img);
            elementFusionne.appendChild(fondIcone);
            gallery.appendChild(elementFusionne);

            // NEW/NEW/NEW : Ajout de l'écouteur d'événement pour supprimer l'élément
            fondIcone.addEventListener('click', async function () {
                const id = elementFusionne.dataset.id;
                try {
                    const response = await fetch(`${deleteWorksUrl}/${id}`, { method: 'DELETE' });
                    if (response.ok) {
                        console.log(`Project with ID ${id} deleted successfully.`);
                        elementFusionne.remove(); // NEW/NEW/NEW : Suppression de l'élément du DOM
                    } else {
                        console.error(`Failed to delete project with ID ${id}.`);
                    }
                } catch (error) {
                    console.error(`Error deleting project with ID ${id}:`, error);
                }
            });

            console.log("Created element:", elementFusionne);
        });
    }

    // Fonction pour initialiser la galerie
    async function initGallery() {
        const imageUrls = await fetchWorks();
        clearGallery();
        createGalleryItems(imageUrls);
    }

    initGallery();
});


Fin version00 qui fonctionne*/