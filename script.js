const API_URL =
  "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_iZ6Eefeyg5DLUA6jbq3Hpur4QJE4fF3mIT6zQ6Q0glEARel7jl6LqfMmbcCdpVsg";
const btn = document.querySelector(".reload-page");

btn.addEventListener("click", reload);

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

async function reload() {
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data);

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
}

reload(); // -> Hacer llamado a la funcion apenas cargue el codigo js para que cuando entremos a la pagina evitemos que no aparezca vacia.
