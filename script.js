const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";
const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";

const btn = document.querySelector(".reload-kittens-images");
const starIcon = document.querySelectorAll(".star-icon");
const spanError = document.getElementById("error");

btn.addEventListener("click", loadRandomKittens);
starIcon.forEach((icon) => {
  icon.addEventListener("click", saveFavoritesKittens);
});

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

async function loadRandomKittens() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  console.log("random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerText = "Error: " + res.status + " " + data.message;
  } else {
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
  }
}

async function loadFavoritesKittens() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("favorites");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerText = "Error: " + res.status + " " + data.message;
  }
}

async function saveFavoritesKittens() {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: "cdq",
    }),
  });
  const data = await res.json();

  console.log("saved");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerText = "Error: " + res.status + " " + data.message;
  }
}

loadRandomKittens(); // -> Hacer llamado a la funcion apenas cargue el codigo js para que cuando entremos a la pagina evitemos que no aparezca vacia.
loadFavoritesKittens();
