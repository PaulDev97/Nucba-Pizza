import { category } from "./objectCategory.js";

const listCategory = category;

/* COMIENZO DE LOGICA DE RENDERS, SELECTORES DE PARAMETROS Y LLAMADOS DE DOM */
console.log("lista categoria", listCategory);

/* Llamados a elementos del DOM */
const filterButtons = document.querySelectorAll(".btn");
const containerCategories = document.querySelector(".container__categories");
const cardsContainer = document.querySelector(".container__render--cards");
const categoryContainers = document.querySelectorAll(".category");

/* -------------------Funciones seccion categorias------------------- */
const categoryController = {
  searchCategory: "populares",
};

const selectorParameter = (category) => {
  return (categoryController.searchCategory = category);
};

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
  cardsContainer.innerHTML = lista.map((comida) => renderCard(comida)).join("");
};

const getCategory = () => {
  const findCategory = () => {
    const categoryFind = listCategory.find((e) => e.seccion == categoryController.searchCategory);
    return categoryFind.lista;
  };
  return renderCards(findCategory());
};

const init = () => {
  window.addEventListener("DOMContentLoaded", getCategory);
  containerCategories.addEventListener("click", changeCategory);
  containerCategories.addEventListener("click", getCategory);
};
init();

/* Cambiar parametro por defecto a populares */
/* Unir css de renders */
