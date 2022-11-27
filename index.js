// --------------------------------Los mas populares------------------------------  //
const ejemplo = [

    {
        seccion: "populares",
        lista: [
            {
                nombre: "Asesina",
                comentario: "Comentario 1",
                img: './img/populares/asesina.jpg',
                precio: 800
            },
            {
                nombre: "Completa",
                comentario: "Comentario 1",
                img: './img/populares/completa.jpg',
                precio: 800
            },
            {
                nombre: "Turín",
                comentario: "Comentario 1",
                img: './img/populares/turin.jpg',
                precio: 800
            },
            {
                nombre: "Verona",
                comentario: "Comentario 1",
                img: './img/populares/verona.jpg',
                precio: 800
            },
            {
                nombre: "Popular 5",
                comentario: "Comentario 1",
                img: './img/populares/wrap-carneEnCubos.jpeg',
                precio: 800
            },
            {
                nombre: "Popular 6",
                comentario: "Comentario 1",
                img: './img/populares/wrap-cerdo.jpg',
                precio: 800
            },
            {
                nombre: "Popular 7",
                comentario: "Comentario 1",
                img: './img/populares/mexicanFood-dorados.jpg',
                precio: 800
            },
            {
                nombre: "Popular 8",
                comentario: "Comentario 1",
                img: './img/populares/dulce-de-leche.jpg',
                precio: 800
            }
        ]
    },
    {
        seccion: "pizzas",
        lista: [
            {
                nombre: "Roma",
                comentario: "Comentario 1",
                img: './img/pizzas/roma.jpg',
                precio: 800
            },
            {
                nombre: "Nápoles",
                comentario: "Comentario 1",
                img: './img/pizzas/napoles.jpg',
                precio: 900
            },
            {
                nombre: "Venecia",
                comentario: "Comentario 1",
                img: './img/pizzas/venecia.jpg',
                precio: 900
            },
            {
                nombre: "Milán",
                comentario: "Comentario 1",
                img: './img/pizzas/milan.jpg',
                precio: 950
            },
            {
                nombre: "Florencia",
                comentario: "Comentario 1",
                img: './img/pizzas/florencia.jpg',
                precio: 950
            },
            {
                nombre: "Turín",
                comentario: "Comentario 1",
                img: './img/pizzas/turin.jpg',
                precio: 1000
            },
            {
                nombre: "Verona",
                comentario: "Comentario 1",
                img: './img/pizzas/verona.jpg',
                precio: 1000
            },
            {
                nombre: "Génova",
                comentario: "Comentario 1",
                img: './img/pizzas/genova.jpg',
                precio: 1000
            }
        ]
    },
    {
        seccion: "hamburguesas",
        lista: [
            {
                nombre: "Simple",
                comentario: "Comentario 1",
                img: './img/hamburguesas/simple.jpg',
                precio: 800
            },
            {
                nombre: "Nera",
                comentario: "Comentario 1",
                img: './img/hamburguesas/nera.jpg',
                precio: 900
            },
            {
                nombre: "Pollo",
                comentario: "Comentario 1",
                img: './img/hamburguesas/pollo.jpg',
                precio: 900
            },
            {
                nombre: "Paltosa",
                comentario: "Comentario 1",
                img: './img/hamburguesas/paltosa.jpg',
                precio: 950
            },
            {
                nombre: "Cebollita",
                comentario: "Comentario 1",
                img: './img/hamburguesas/cebollita.jpg',
                precio: 950
            },
            {
                nombre: "Completa",
                comentario: "Comentario 1",
                img: './img/hamburguesas/completa.jpg',
                precio: 1000
            },
            {
                nombre: "Pepino",
                comentario: "Comentario 1",
                img: './img/hamburguesas/pepino.jpg',
                precio: 1000
            },
            {
                nombre: "Asesina",
                comentario: "Comentario 1",
                img: './img/hamburguesas/asesina.jpg',
                precio: 1000
            }
        ]
    }

]

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

filtraPopulares(ejemplo)

// -------------------------------------------------------------------------------  //

