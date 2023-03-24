const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";
const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";

const btn = document.querySelector(".reload-kittens-images");
const spanError = document.getElementById("error");
const starIcon = document.querySelectorAll(".star-icon");
// hola
btn.addEventListener("click", loadRandomKittens);

function createKittyCard(kitty, iconUrl, alt) {
  const cardContainer = document.createElement("div");
  const figureIcon = document.createElement("figure");
  const imgIcon = document.createElement("img");
  const imgKitty = document.createElement("img");

  cardContainer.setAttribute("class", "img-container");
  figureIcon.setAttribute("class", "icon-container");
  imgIcon.setAttribute("class", "star-icon");
  imgIcon.setAttribute("src", iconUrl);
  imgIcon.setAttribute("alt", "star");
  imgKitty.setAttribute("id", kitty.id);
  imgKitty.setAttribute("alt", alt);
  imgKitty.setAttribute("src", kitty.url);

  imgIcon.addEventListener("click", () => saveFavoriteKitty(kitty.id));

  const fragment = document.createDocumentFragment();
  figureIcon.appendChild(imgIcon);
  fragment.appendChild(figureIcon);
  fragment.appendChild(imgKitty);
  cardContainer.appendChild(fragment);
  return cardContainer;
}

const kittyContainer = document.getElementById("random-kittens-container");

async function loadRandomKittens() {
  // Vaciar el contenedor antes de agregar nuevos elementos
  kittyContainer.innerHTML = "";

  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();

  console.log("Random");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Error ${response.status}. Try later.`;
  } else {
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      const kittyElement = createKittyCard(
        item,
        "/others/star.png",
        "Random Kitty"
      );
      fragment.appendChild(kittyElement);
    });

    kittyContainer.appendChild(fragment);
  }
}

// saveFavoriteKitty(data[0].id);   -> El objeto de michis random y favoritos es un poco diferente.

async function loadFavoritesKittens() {
  const response = await fetch(API_URL_FAVORITES);
  const data = await response.json();

  console.log("Favorites");
  console.log(data);

  if (response.status !== 200) {
    console.log(response);
    spanError.innerText = `Error ${response.status}. Try later.`;

    // El array de michis favoritos tiene objetos y cada objeto tiene el image_id y una propiedad imd con el mismo id y una url.
    // recorrer el array de data para obtener la url y ponersela a las imagenes de michis favoritos.
  } else {
    const fragment = document.createDocumentFragment();
    const favoriteKittyContainer = document.getElementById(
      "favorites-kittens-container"
    );

    data.forEach((favoriteKitty) => {
      const kittyElement = createKittyCard(
        favoriteKitty.image,
        "/others/star-remove.png",
        "Favorite Kitty Pic"
      );
      fragment.appendChild(kittyElement);
    });
    favoriteKittyContainer.appendChild(fragment);
  }
}

async function saveFavoriteKitty(id) {
  // console.log(id);
  const response = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // -> Enviar un JSON que es el lenguaje comun entre frontend y backend
    },
    body: JSON.stringify({
      // -> El JSON.stringify convierte un objeto en una cadena de texto JSON.
      image_id: id,
    }),
  });
  const data = await response.json();

  console.log("Saved");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerText = `Error ${response.status}. Try later.`;
  }
  loadFavoritesKittens();
}

loadRandomKittens(); // -> Hacer llamado a la funcion apenas cargue el codigo js para que cuando entremos a la pagina evitemos que no aparezca vacia.
loadFavoritesKittens();
