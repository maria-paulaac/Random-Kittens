const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";
const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";

const apiUrlFavoriteDelete = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg`;

const btn = document.querySelector(".reload-kittens-images");
const spanError = document.getElementById("error");
const starIcon = document.querySelectorAll(".star-icon");

btn.addEventListener("click", loadRandomKittens);

function createKittyCard({
  kitty,
  iconUrl,
  classIconStar,
  altIcon,
  altImgKitty,
  onClick,
}) {
  const cardContainer = document.createElement("div");
  const figureIcon = document.createElement("figure");
  const imgIcon = document.createElement("img");
  const imgKitty = document.createElement("img");

  cardContainer.setAttribute("class", "img-container");
  figureIcon.setAttribute("class", "icon-container");
  imgIcon.setAttribute("class", classIconStar);
  imgIcon.setAttribute("src", iconUrl);
  imgIcon.setAttribute("alt", altIcon);
  imgKitty.setAttribute("id", kitty.id);
  imgKitty.setAttribute("alt", altImgKitty);
  imgKitty.setAttribute("src", kitty.url);

  if (onClick) {
    imgIcon.addEventListener("click", onClick);
  }

  const fragment = document.createDocumentFragment();
  figureIcon.appendChild(imgIcon);
  fragment.appendChild(figureIcon);
  fragment.appendChild(imgKitty);
  cardContainer.appendChild(fragment);
  return cardContainer;
}

const kittyContainer = document.getElementById("random-kittens-container");

async function loadRandomKittens() {
  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();

  console.log("Random");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Error ${response.status}. Try later.`;
  } else {
    const fragment = document.createDocumentFragment();
    data.forEach((item) => {
      const kittyElement = createKittyCard({
        kitty: item,
        iconUrl: "https://maria-paulaac.github.io/others/star.png",
        classIconStar: "star-icon",
        altIcon: "icon-star",
        altImgKitty: "Random Kitty",
        onClick: () => saveFavoriteKitty(item.id),
      });
      fragment.appendChild(kittyElement);
    });

    kittyContainer.replaceChildren(fragment);
  }
}

async function loadFavoritesKittens() {
  const favoriteKittyContainer = document.getElementById(
    "favorites-kittens-container"
  );

  const response = await fetch(API_URL_FAVORITES);
  const data = await response.json();

  console.log("Favorites");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Error ${response.status}. Try later.`;
  } else {
    const fragment = document.createDocumentFragment();

    data.forEach((favoriteKitty) => {
      const kittyElement = createKittyCard({
        kitty: favoriteKitty.image,
        iconUrl: "https://maria-paulaac.github.io/others/star-remove.png",
        classIconStar: "remove-star-icon",
        altIcon: "icon-remove-star",
        altImgKitty: "Favorite Kitty Pic",
        onClick: () => deleteFavoriteKitty(favoriteKitty.id),
      });
      fragment.appendChild(kittyElement);
    });
    favoriteKittyContainer.replaceChildren(fragment);
  }
}

async function saveFavoriteKitty(id) {
  const response = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await response.json();

  console.log("Saved");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerText = `Error ${response.status}. Try later.`;
  } else {
    console.log("Kitty saved in favorites");
  }
  loadFavoritesKittens();
}

async function deleteFavoriteKitty(id) {
  const response = await fetch(apiUrlFavoriteDelete(id), {
    method: "DELETE",
  });
  const data = await response.json();
  console.log("Deleted");
  console.log(data);

  if (response.status !== 200) {
    spanError.innerText = `Error ${response.status}. Try later.`;
  } else {
    console.log("Kitty removed from favorites");
  }
  loadFavoritesKittens();
}

loadRandomKittens();
loadFavoritesKittens();
