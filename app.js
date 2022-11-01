//obtener secciones
const seccionBurgers = document.getElementById("burgers");
const seccionPapas = document.getElementById("papas");
const seccionBebidas = document.getElementById("bebidas");
const carritoContainer = document.getElementById("carritoContainer");
const mostrarCarrito = document.getElementById("mostrarCarro");
const noMostrar = document.getElementById("noMostrar");
const totalCarrito = document.getElementById("total");
const cantidadEnElCarrito = document.getElementById("cantidadEnElCarrito");
const comprar = document.getElementById("comprar");
let final;
// array de carrito
let cart = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarrito();

//Agregar IVA a los productos
for (const prods of PRODUCTOS) {
    prods.agregarIva();
}

//Funcion para renderizar productos
function renderizarProductos() {

    //Renderizar
    PRODUCTOS.forEach((prod) => {
        if (prod.tipo == "hamburguesa") {
            seccionBurgers.innerHTML += `
                <div class="prod jumbotron">
                    <div>
                        <h3>${prod.nombre}</h3>
                        <p>${prod.desc}</p>
                        <p class="precio">${divisa}${prod.precio}</p>
                        <button id="btn${prod.id}" class="btn btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                    <div>
                        <img src="${prod.imagen}">
                    </div>
                </div>
                `
        } else if (prod.tipo == "papas") {
            seccionPapas.innerHTML += `
                <div class="prod jumbotron">
                    <div>
                        <h3>${prod.nombre}</h3>
                        <p class="precio">${divisa}${prod.precio}</p>
                        <button id="btn${prod.id}" class="btn btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                    <div>
                        <img src="${prod.imagen}">
                    </div>
                </div>
                `
        } else if (prod.tipo == "bebida") {
            seccionBebidas.innerHTML += `
            <div class="prod jumbotron">
                <div>
                    <h3>${prod.nombre}</h3>
                    <p class="precio">${divisa}${prod.precio}</p>
                    <button id="btn${prod.id}" class="btn btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
                <div>
                    <img src="${prod.imagen}">
                </div>
            </div>
            `
        }
    })

    //Evento para agregar al carrito
    PRODUCTOS.forEach((producto) => {
        document.getElementById(`btn${producto.id}`).addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });

}

renderizarProductos();
mostrarCarrito.addEventListener("click", () => {

    if (noMostrar.classList.contains("noMostrar")) {

        noMostrar.classList.remove("noMostrar");
        // noMostrar.classList.add("animate__backInLeft");
        noMostrar.classList.add("animate__backInRight");

    } else {
        noMostrar.classList.add("noMostrar");
    }
});

noMostrar.addEventListener('animationend', () => {
    noMostrar.classList.remove("animate__backInRight");
});

function agregarAlCarrito(producto) {
    // Si el objeto existe en el carrito, sumarle cantidad
    if (cart.find((elem) => elem.id == producto.id)) {
        cart.find((elem) => {
            if (producto.id == elem.id && elem.cantidad) {
                elem.cantidad++
                actualizarCarrito();
            }
        })
    } else {
        cart.push({
            ...producto,
            cantidad: 1,
        });
    }

    actualizarCarrito();
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(cart))
}

function renderizarProductosCarrito() {

    carritoContainer.innerHTML = "";
    cart.map(producto => {
        carritoContainer.innerHTML += `
        <tr id="itemCarrito${producto.id}">
            <th><img src=${producto.imagen} id="imgCarrito"> ${producto.nombre}</th>
            <th>${divisa}${producto.precio}</th>
            <th id="cantidad-${producto.id}">${producto.cantidad}</th>
            <th><button class="btn btn-danger" id="eliminarProducto${producto.id}"><i class="fa fa-trash"></i></button></th>
        </tr>
        `;
    })

    // Eventos para boton eliminar producto
    cart.forEach((producto) => {
        document.getElementById(`eliminarProducto${producto.id}`).onclick = () => {
            eliminarProductoCarro(producto);
        }
    })
}

function eliminarProductoCarro(eliminarProd) {
    cart.splice(cart.indexOf(eliminarProd), 1);
    actualizarCarrito();
};

function actualizarCarrito() {
    renderizarProductosCarrito();

    //Sumar todos los precios de los productos en el carrito.
    final = cart.reduce((acumulador, prod) => acumulador + (prod.precio * prod.cantidad), 0).toFixed(2);

    //Cantidad de productos en el carrito
    if (cart.length == 0) {
        cantidadEnElCarrito.innerText = "";
        totalCarrito.innerText = "No hay productos en el carrito";
    } else {
        cantidadEnElCarrito.innerText = `${cart.reduce((acum, prod) => acum + prod.cantidad, 0)}`;
        totalCarrito.innerText = `Total: ${divisa}${final}`;
    }
    guardarStorage();
}

comprar.onclick = () => {
    if (cart == 0) {
        Swal.fire('El carrito esta vacio')
    } else {
        Swal.fire('Gracias por su compra')
        cart = [];
        guardarStorage();
        renderizarProductosCarrito();
        actualizarCarrito();
    }
}