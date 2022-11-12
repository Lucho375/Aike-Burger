//obtener secciones
const seccionBurgers = document.getElementById("burgers");
const seccionPapas = document.getElementById("papas");
const seccionBebidas = document.getElementById("bebidas");
const carritoContainer = document.getElementById("carritoContainer");
const mostrarCarrito = document.getElementById("mostrarCarro");
const noMostrar = document.getElementById("noMostrar");
const totalCarrito = document.getElementById("total");
const cantidadEnElCarrito = document.getElementById("cantidadEnElCarrito");
const finalizarCompra = document.getElementById("comprar");
let final;

// array de carrito
let cart = JSON.parse(localStorage.getItem("carrito")) || [];

// Funcion async para pedir productos
(async function productos() {
    const response = await fetch("../productos.json");
    PRODUCTOS = await response.json();
    agregarIva(PRODUCTOS);
    renderizarProductos(PRODUCTOS);
    actualizarCarrito();
})();

//Agregar iva a todos los productos del array PRODUCTOS
function agregarIva(e) {
    e.map((e) => {
        e.precio *= 1.21
    })
}

//Funcion para renderizar productos
function renderizarProductos() {

    //Renderizar por tipo de producto. 1-hamburguesa 2- papas 3-bebidas
    PRODUCTOS.forEach((prod) => {
        if (prod.tipo == "hamburguesa") {
            seccionBurgers.innerHTML += `
                <div class="prod jumbotron">
                    <div>
                        <h3>${prod.nombre}</h3>
                        <p>${prod.desc}</p>
                        <p class="precio">$${prod.precio}</p>
                        <button id="btn${prod.id}" class="btn btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                    <div>
                        <img src="${prod.imagen}">
                    </div>
                </div>
                `;
        } else if (prod.tipo == "papas") {
            seccionPapas.innerHTML += `
                <div class="prod jumbotron">
                    <div>
                        <h3>${prod.nombre}</h3>
                        <p class="precio">$${prod.precio}</p>
                        <button id="btn${prod.id}" class="btn btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                    <div>
                        <img src="${prod.imagen}">
                    </div>
                </div>
                `;
        } else if (prod.tipo == "bebida") {
            seccionBebidas.innerHTML += `
            <div class="prod jumbotron">
                <div>
                    <h3>${prod.nombre}</h3>
                    <p class="precio">$${prod.precio}</p>
                    <button id="btn${prod.id}" class="btn btn-add"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
                <div>
                    <img src="${prod.imagen}">
                </div>
            </div>
            `;
        }
    })

    //Evento para agregar al carrito
    PRODUCTOS.forEach((producto) => {
        document.getElementById(`btn${producto.id}`).addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
}

//Evento click para mostrar el contenedor del carrito
mostrarCarrito.addEventListener("click", () => {
    if (noMostrar.classList.contains("noMostrar")) {
        noMostrar.classList.add("animate__animated", "animate__backInRight");
        noMostrar.classList.remove("noMostrar",);
    } else {
        noMostrar.classList.remove("animate__backInRight");
        noMostrar.classList.add("animate__backOutRight");
        setTimeout(() => {
            //Borrar la clase de backOutRight al salir para no causar error al volver a entrar
            noMostrar.classList.add("noMostrar");
            noMostrar.classList.remove("animate__backOutRight");
        }, 300)
    }
});

function agregarAlCarrito(producto) {
    // Si el objeto existe en el carrito, sumarle cantidad, de lo contrario agregarlo y agregarle la propiedad de cantidad.
    if (cart.find((elem) => elem.id == producto.id)) {
        cart.find((elem) => {
            if (producto.id == elem.id && elem.cantidad) {
                elem.cantidad++
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


// Funcion para guardar carrito en storage
function guardarStorage() {
        localStorage.setItem("carrito", JSON.stringify(cart))
}

function renderizarProductosCarrito() {
    //Renderiza los productos ya existentes en el carrito
    carritoContainer.innerHTML = "";
    cart.forEach(producto => {
        carritoContainer.innerHTML += `
        <tr id="itemCarrito${producto.id}">
            <th><img src=${producto.imagen} id="imgCarrito"> ${producto.nombre}</th>
            <th>$${producto.precio}</th>
            <th id="cantidad-${producto.id}"><button class="btn btn-cant" id="btnRes${producto.id}">-</button>${producto.cantidad}<button class="btn btn-cant" id="btnSum${producto.id}">+</button></th>
            <th><button class="btn btn-danger" id="eliminarProducto${producto.id}"><i class="fa fa-trash"></i></button></th>
        </tr>
        `;
    })

    //Boton eliminar producto
    cart.forEach((producto) => {
        document.getElementById(`eliminarProducto${producto.id}`).onclick = () => {
            eliminarProductoCarro(producto);
        }
    })
    //Boton restar cantidad
    cart.forEach((prod) => {
        document.getElementById(`btnRes${prod.id}`).onclick = () => {
            restarProd(prod);
        }
    })

    //Boton sumar cantidad
    cart.forEach((prod) => {
        document.getElementById(`btnSum${prod.id}`).onclick = () => {
            sumarProd(prod);
        }
    })
}

//Eliminar un producto del carrito
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
        totalCarrito.innerText = `Total: $${final}`;
    }
    guardarStorage();
}

finalizarCompra.onclick = () => {
    if (cart == 0) {
        Swal.fire('El carrito esta vacio')
    } else {
        Swal.fire('Gracias por su compra')
        cart = [];
        renderizarProductosCarrito();
        actualizarCarrito();
        localStorage.removeItem("carrito");
    }
}

function sumarProd(x) {
    x.cantidad++
    actualizarCarrito();
}

function restarProd(x) {
    x.cantidad--
    if (x.cantidad == 0) {
        eliminarProductoCarro(x)
    }
    actualizarCarrito();
}