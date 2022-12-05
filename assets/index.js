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
const btnComprarCart = document.querySelector(".btn__comprar--cart");
const containerCartToggle = document.querySelector(".container__cart--toggle");
const containerCartCards = document.querySelector(".container__products--cart");
/* const containerCart = document.querySelector(".container__cart"); */
const totalCart = document.querySelector(".cart__total");
const bubbleCountCart = document.querySelector(".cart__bubble--count");





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
  const { nombre, img, comentario, precio, id } = lista;
  return `
  <div class="popu-card">
    <div class="popu-img-container" style="background-image: url(${img})" alt="${nombre}"></div>
    <h3 class="popu-name">${nombre}</h3>
    <h3 class="popu-eslogan">${comentario}</h3>
    <div class="popu-precio-btn-container">
      <h2 class="popu-precio">$${precio}</h2>
      <button class="popu-btn" data-nombre="${nombre}" data-precio="${precio}" data-comentario="${comentario}" data-img="${img}" data-id="${id}">
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

/* ------------------Logica del carrito------------------ */
/* Funcion para ocultar y mostrar el menu */
const toggleMenu = () => {
  containerCartToggle.classList.toggle("container__cart--toggle");
};

/* Render card cart */
const renderProductCart = (product) => {
  const { nombre, img, comentario, precio, cantidad, id } = product;
  return `  <div class="render__products--cart">
              <div class="image__container--cart" style="background-image: url(${img})"></div>
              <div class="info__card--cart">
                <h2 class="title__card--cart">${nombre}</h2>
                <span class="comentario__card--cart">${comentario}</span>
                <span class="price__card--cart">$${precio}</span>
              </div>
              <div class="amountSettings__card--cart">
                <div class="container__minusButton--cart">
                  <button class="button__minus--cart" data-nombre=${nombre} data-id='${id}'>-</button>
                </div>
                <span class="amount__card">${cantidad}</span>
                <div class="container__addButton--cart">
                  <button class="button__add--cart" data-nombre=${nombre} data-id='${id}'>+</button>
                </div>
              </div>
            </div>
          `;
};

/* Funcion renderizadora carrito card */
const renderCart = () => {
  if (!cart.length) {
    containerCartCards.classList.add("correction");
    containerCartCards.innerHTML = `<p class="cart__empty--message">No tienes productos en el carro.</p>`;
    return;
  } else {
    containerCartCards.classList.remove("correction");
    containerCartCards.innerHTML = cart.map(renderProductCart).join("");
  }
};

/* Funcion obtener total precio cart */
const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.cantidad, 0);
};

/* Funcion que rendeirza el total de la compra */
const showTotal = () => {
  totalCart.innerHTML = `$${getCartTotal().toFixed(2)}`;
};

/* Funcion obtener total de productos en carrito */
const getTotalProducts = () => {
  return cart.reduce((acc, cur) => acc + cur.cantidad, 0);
};

/* Funcion renderizadora para burbuja con el total de productos y ocultar o mostrar la bubble si hay o no hay productos en carrito*/
const showBubbleCount = () => {
  const numberCount = (bubbleCountCart.textContent = getTotalProducts());
  if (numberCount !== 0) {
    bubbleCountCart.classList.remove("disabled");
  } else {
    bubbleCountCart.classList.add("disabled");
  }
  console.log("cantidad de productos en carrito(bubble) ===>>", numberCount);
  return numberCount;
};

/* Desabilitar boton de compra si no hay productos en el carrito */
const btnDisable = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

/* Funcion que activa la mayoria de funciones, para renderizar card, guardar en LS, mostrar el total, desabilitar y habilitar botones */
const checkStateCart = () => {
  saveToLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  btnDisable(btnComprarCart);
  showBubbleCount(cart);
};

/* Funcion agregar producto al carrito */
const addProductToCart = (e) => {
  if (!e.target.classList.contains("popu-btn")) return;
  const { nombre, precio, comentario, img, id } = e.target.dataset;

  const setDataProduct = (nombre, precio, comentario, img,id) => {
    return { nombre, precio, comentario, img,id };
  };

  const product = setDataProduct(nombre, precio, comentario, img, id);

  const existProduct = (element) => {
    console.log(element);
    return cart.find((obj) => obj.nombre == element.nombre);
  };

  if (existProduct(product)) {
    addUnitProduct(product);
  } else {
    createCartProduct(product);
  }
  /* Una vez que se termina de chequear si exister o sino existe, se ejecuta la funcion general que llama a las funciones renderizadoras y demás */
  checkStateCart();
};

/* Funcion para crear la card de producto en el carrito */
const createCartProduct = (product) => {
  cart = [...cart, { ...product, cantidad: 1 }];
};

/* Agregar una unidad en el carrito si existe el producto */
const addUnitProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.nombre == product.nombre
      ? {
          ...cartProduct,
          cantidad: cartProduct.cantidad + 1,
        }
      : cartProduct
  );
};

/* --------------------logica Botones ---------------------------- */


//1-Checkear si apretamos boton - o +
const handleQuantity = e => {
  if(e.target.classList.contains('button__minus--cart')){
    btnRestar(e.target.dataset.id)
  }
  else if (e.target.classList.contains('button__add--cart')){
    btnSumar(e.target.dataset.id)
  }
  checkStateCart()
   
  
}

//2-- Funcion para manipular boton -
const btnRestar = id => {
  //buscamos en el carrito si ya existe ese producto
  const existCardProduct = cart.find(item => item.id === id);

  console.log(existCardProduct)
 
  //Si hay solo 1 producto y el usuario apreta el -
  if(existCardProduct.cantidad === 1){
    if(window.confirm('Eliminar producto')){
      //codigo funcion 16
      removeCardProduct(existCardProduct)
    }
    return
  }
  //Si el if no se cumple entonces viene a esta funcion que le va a restar a la cantidad 1. Le pasamos como parametro el exist... encontrado
  restarUnidadProducto(existCardProduct)

  checkStateCart()
}


//3- Funcion para restar 1 unidad
const restarUnidadProducto = existProduct => {
  //mapeo del carrito para obtener el producto igual al que se le pasó a restarUnidadProducto.
  //Si existe entonces hacemos una copia del producto y le decimos que ahora la cantidad de ese producto le restaremos 1 caso contrario solo retorna el producto
  cart = cart.map(product => {
    return product.id === existProduct.id
    ?{...product, cantidad:Number(product.cantidad) - 1}
    :product;
  })
}

//4- funcion para eliminar producto del carrito
const removeCardProduct = existProduct=> {
  //Traeme todo los productos que sean diferentes al id 
  cart = cart.filter(item => item.id !== existProduct.id)

  //Actualizamos Local y eso lo borra del localStorage
  checkStateCart()

} 


//5- Funcion cuando apretemos boton +
const btnSumar = id => {
  const existCardProduct = cart.find(item => item.id === id);

  addUnitProduct(existCardProduct)

}









const init = () => {
  window.addEventListener("DOMContentLoaded", getCategory);
  window.addEventListener("DOMContentLoaded", getCategoryTitle);
  containerCategories.addEventListener("click", changeCategory);
  containerCategories.addEventListener("click", getCategory);
  containerCategories.addEventListener("click", getCategoryTitle);
  btnCart.addEventListener("click", toggleMenu);
  btnCartButtonClose.addEventListener("click", toggleMenu);
  window.addEventListener("DOMContentLoaded", renderCart);
  window.addEventListener("DOMContentLoaded", showTotal);
  window.addEventListener("DOMContentLoaded", showBubbleCount);
  window.addEventListener("DOMContentLoaded", btnDisable(btnComprarCart));
  cardsContainer.addEventListener("click", addProductToCart);


  containerCartCards.addEventListener("click",handleQuantity)


};

init();





