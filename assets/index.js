import { category } from './objectCategory.js';

const listCategory = category

// --------------------------------Los mas populares------------------------------  //

const popuContainer = document.getElementById('popu-container')

const filtraPopulares = (arrayComida) => {
    arrayComida.map(comida => {
        if (comida.seccion === 'populares') {
            const populares = comida.lista
            renderCards(populares)
        }
    })
}

const renderCards = (popuArray) => {
    popuArray.map(p => popuCard(p))
}

const popuCard = (popuList) => {
    const { nombre, comentario, img, precio } = popuList

    return popuContainer.innerHTML += `
            <div class="popu-card">
                <div class="popu-img-container">
                    <img src=${img} alt="Imagen de comida" />
                </div>
                <h3 class="popu-name">${nombre}</h3>
                <h3 class="popu-eslogan">${comentario}</h3>
                <div class="popu-precio-btn-container">
                    <h2 class="popu-precio">$ ${precio}</h2>
                    <button class="popu-btn">Agregar</button>
                </div>
            </div>
        `
}

filtraPopulares(listCategory)

// -------------------------------------------------------------------------------  //

