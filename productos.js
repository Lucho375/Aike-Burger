// Constructor
class Producto {
    constructor(id, nombre, desc, imagen, precio, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.desc = desc;
        this.imagen = imagen;
        this.precio = precio;
        this.tipo = tipo;
    }

    agregarIva() {
        this.precio = this.precio * 1.21;
    }
}

//crear productos

//hamburguesas
const cuartoAike = new Producto(1, "1/4 de Aike", "Hamburguesa con queso cheddar, cebolla brunoise y salsa 1/4.", "../assets/img/img5.jpg", 1499, "hamburguesa");
const aikeBurger = new Producto(2, "Aike Burger", "Hamburguesa con queso cheddar, bacon, cebolla crispy y salsa mil islas.", "../assets/img/img6.jpg", 1250, "hamburguesa");
const aikeClasica = new Producto(3, "Aike Clasica", "Hamburguesa con queso cheddar, lechuga, tomate, cebolla, pepinillos y salsa mil islas.", "../assets/img/img4.jpg", 1100, "hamburguesa");
const aikeFungi = new Producto(4, "Aike Fungi", "Hamburguesa con queso danbo y champiñones salteados en manteca.", "../assets/img/img2.jpg", 1200, "hamburguesa");

//papas fritas
const papasFritas = new Producto(5, "Papas fritas", "Porción de papas fritas", "../assets/img/fritas.jpg", 450, "papas");
const papasConCheddar = new Producto(6, "Papas fritas con cheddar", "Porción de papas fritas con cheedar", "../assets/img/fritascc.jpg", 750, "papas");
const papasCYB = new Producto(7, "Papas fritas con cheddar, bacon y verdeo", "Porción de papas fritas con cheddar, bacon y verdeo.", "../assets/img/papascbv.jpg", 850, "papas");

//bebidas
const cocaCola = new Producto(8, "Coca-Cola", "bebida de cola gasificada", "../assets/img/coca_lata.jpg", 250, "bebida");
const sprite = new Producto(9, "Sprite", "bebida de limalimon gasificada", "../assets/img/sprite_lata.jpg", 250, "bebida");
const fanta = new Producto(10, "Fanta", "bebida de naranja gasificada", "../assets/img/fanta_lata.jpg", 250, "bebida");
const pasoDeLosToros = new Producto(11, "Paso de los toros", "bebida de pomelo gasificada", "../assets/img/pdlt_lata.jpg", 250, "bebida");

// array de productos
const PRODUCTOS = [aikeBurger, aikeClasica, aikeFungi, papasFritas, papasConCheddar, papasCYB, cocaCola, sprite, fanta, pasoDeLosToros, cuartoAike];
// divisa
const divisa = "$";