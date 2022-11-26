import { category } from "./objectCategory.js";

const listCategory = category;

/* COMIENZO DE LOGICA DE RENDERS, SELECTORES DE PARAMETROS Y LLAMADOS DE DOM */
console.log("lista categoria", listCategory);

/* Llamados a elementos del DOM */
const filterButtons = document.querySelectorAll(".btn");
const containerCategories = document.querySelector(".container__categories");
const cardsContainer = document.querySelector(".popu-card-container");
const categoryContainers = document.querySelectorAll(".category");
const categoryTitle = document.querySelector(".container__categoty--title");
const btnCart = document.querySelector(".btn-cart");
const btnCartButtonClose = document.querySelector(".btn__cart--close");
const containerCart = document.querySelector(".container__cart--toggle");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveToLocalStorage = (key) => {
  localStorage.setItem("cart", JSON.stringify(key));
};

/* -------------------Funciones seccion categorias------------------- */
/* Funcion que encuentra la categoria actual y llama a la funcion renderizadora*/

/* Controlador de categoria */
const categoryController = {
  searchCategory: "populares",
};

/* Funcion que cambia la propiedad de en el controlador de categoria */
const selectorParameter = (category) => {
  return (categoryController.searchCategory = category);
};

/* Funcion que cambia la categoria en base a botones y cambia tambien las clases de los botones */
const changeCategory = (e) => {
  if (!e.target.classList.contains("btn")) return;
  const btnSelected = e.target.dataset.categorie;
  selectorParameter(btnSelected);
  const buttons = [...filterButtons];
  const categoryActive = [...categoryContainers];

  let setDATA = [];

  buttons.forEach((btn) => {
    const datasetName = btn.dataset.categorie;
    const datasetBtn = btn.dataset.categorie !== btnSelected;
    setDATA.push({ datasetName, datasetBtn });
  });

  const findFalse = setDATA.find((e) => e.datasetBtn == false);

  categoryActive.forEach((cat) => {
    const datasetFilter = cat.dataset.filter;
    if (datasetFilter != findFalse.datasetName) {
      cat.classList.remove("category__active");
    } else {
      cat.classList.add("category__active");
    }
  });
  console.log(setDATA);
};

console.log("controlador de categoria:", categoryController);

/* Contenedor del render */
const renderCard = (lista) => {
  const { nombre, img, comentario, precio } = lista;
  return `
  <div class="popu-card">
  <div class="popu-img-container" style="background-image: url(${img})" alt="${nombre}">
  </div>
  <h3 class="popu-name">${nombre}</h3>
  <h3 class="popu-eslogan">${comentario}</h3>
  <div class="popu-precio-btn-container">
  <h2 class="popu-precio">$${precio}</h2>
  <button class="popu-btn" data-name="${nombre}" data-precio="${precio}" data-comentario="${comentario}" data-img="${img}" >
  Agregar
  </button>
  </div>
  </div>
  `;
};

/* Funcion renderizadora */
const renderCards = (lista) => {
  cardsContainer.innerHTML = lista.map((comida) => renderCard(comida)).join("");
};

/* Funcion que llama a la funcion que contiene la logica de los botones, y encuentra  */
const getCategory = () => {
  const findCategory = () => {
    const categoryFind = listCategory.find((e) => e.seccion == categoryController.searchCategory);
    return categoryFind.lista;
  };
  return renderCards(findCategory());
};

/* Funcion renderizadora */
const renderTitle = (title) => {
  return (categoryTitle.innerHTML = `<h2 class="popu-title">${title}</h2>`);
};

/* Funcion que captura el la categoria actual mediante un Find  */
const getCategoryTitle = () => {
  const findCategory = listCategory.find((e) => e.seccion == categoryController.searchCategory);
  return renderTitle(findCategory.seccion);
};
console.log("getCategoryTitle:", getCategoryTitle());

/* --------funciones para el carrito--------- */
const toggleMenu = () => {
  containerCart.classList.toggle("container__cart--toggle");
};

const init = () => {
  window.addEventListener("DOMContentLoaded", getCategory);
  window.addEventListener("DOMContentLoaded", getCategoryTitle);
  containerCategories.addEventListener("click", changeCategory);
  containerCategories.addEventListener("click", getCategory);
  containerCategories.addEventListener("click", getCategoryTitle);
  btnCart.addEventListener("click", toggleMenu);
  btnCartButtonClose.addEventListener("click", toggleMenu);
};
init();

/* Cambiar parametro por defecto a populares */
/* Unir css de renders */
