document.addEventListener("DOMContentLoaded", async function () {
    console.log("Document is ready");
  
    

//####################################################################################
//RECUPERATION DES API

const apiUrl = "http://localhost:5678/api";
const getWorksUrl = `${apiUrl}/works`;
const getCategoriesUrl = `${apiUrl}/categories`;
const loginUrl = `${apiUrl}/users/login`;


//####################################################################################
//RECUPERATION DES IMAGEURLS DEPUIS l'API 

async function fetchWorks() {
  try {
    const response = await fetch(getWorksUrl);
    const works = await response.json();
    console.log("Works:", works);

    const imageUrls = works.map(work => work.imageUrl);
    console.log("Image URLs:", imageUrls);
    return imageUrls;
  } catch (error) {
    console.error("Erreur lors de la récupération des imageUrls:", error);
    return [];
  }
}

fetchWorks()

//####################################################################################
//INITIALISATION DE LA GALERIE EN EN VIDANT SON CONTENU

function clearGallery() {
    const gallery = document.getElementById('delete-gallery');
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    console.log("#delete-gallery has been cleared");
}

// Appel de la fonction pour vider la galerie
clearGallery();


//####################################################################################
//CREATION DES ELEMENTS DE LA GALERIE

function createGalleryItems(imageUrls) {
    const gallery = document.getElementById('delete-gallery');
    imageUrls.forEach(url => {
        const elementFusionne = document.createElement('div');
        elementFusionne.id = 'element-fusionne';

        const img = document.createElement('img');
        img.className = 'images';
        img.src = url;
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

        console.log("Created element:", elementFusionne);
    });
}

+
        async function initGallery() {
        const imageUrls = await fetchWorks();
        clearGallery();
        createGalleryItems(imageUrls);
        }

        initGallery();

















});





