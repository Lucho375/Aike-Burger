// Agregar producto al carrito (push)
// function agregarAlCarrito(producto) {

//     if (cart.find((item) => item.id == producto.id)) {
//         cart.find((item) => {
//             if (producto.id == item.id) {
//                 item.cantidad++;
//                 //sumar precio
//                 item.precio += producto.precio;
//                 document.getElementById(`cantidad-${producto.id}`).innerText = `${item.cantidad}`;
//             }
//         })

//         //AGREGAR ITEM POR PRIMERA VEZ AL CARRITO

//     } else {
//         cart.push({
//             ...producto,
//             cantidad: 1,
//         });
//         renderizarProductosCarrito(producto);// NO TOCAR MAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     }
//     actualizarCarrito();
//     guardarStorage();
// }