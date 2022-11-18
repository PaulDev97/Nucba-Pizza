import { category } from "./objectCategory.js";

const listCategory = category;

/* COMIENZO DE LOGICA DE RENDERS, SELECTORES DE PARAMETROS Y LLAMADOS DE DOM */
console.log("lista categoria", listCategory[5].lista);

/* Llamados a elementos del DOM */
const filterButtons = document.querySelectorAll(".btn");
const containerCategories = document.querySelector(".container__categories");
const cardsContainer = document.querySelector(".container__render--cards");

const categoryController = {
  searchCategory: "populares",
};

const selectorParameter = (category) => {
  switch (category) {
    case "pizzas":
      "pizzas";
      break;
    case "hamburguesas":
      "hamburguesas";
      break;
    case "papasFritas":
      "papasFritas";
      break;
    case "wraps":
      "wraps";
      break;
    case "mexicanFood":
      "mexicanFood";
      break;
    case "batidos":
      "batidos";
      break;
    default:
      "populares";
      break;
  }
  return category;
};

console.log("parameter ==>:", selectorParameter("batidos"));

/* Contenedor del render */
const renderCard = (lista) => {
  const { nombre, img, comentario, precio } = lista;
  return `
    <div class="popu-card">
        <div class="popu-img-container">
            <img src="${img}" alt="${nombre}" />
        </div>
        <h3 class="popu-name">${nombre}</h3>
        <h3 class="popu-eslogan">${comentario}n</h3>
        <div class="popu-precio-btn-container">
            <h2 class="popu-precio">$${precio}</h2>
            <button class="popu-btn">Agregar</button>
        </div>
    </div>
    `;
};

/* Funcion renderizadora */
const renderCards = (lista) => {
  cardsContainer.innerHTML = lista.map((comida) => renderCard(comida));
};
/* 
const filtraje = (btn) => {
  console.log(btn);
  return btn.forEach((e) => console.log(e));
};
console.log("filterButtons:", filtraje(filterButtons)); */

const init = () => {
  window.addEventListener("DOMContentLoaded", renderCards());
  /* window.addEventListener("DOMContentLoaded", renderCards(listCategory[5].lista)); */
};
init();
