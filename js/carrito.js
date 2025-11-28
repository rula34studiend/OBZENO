function getCarrito() {
    try {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        return carrito.map(item => ({...item, cantidad: item.cantidad || 1}));
    } catch (e) {
        console.error("Error al leer localStorage:", e);
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    window.dispatchEvent(new CustomEvent('cart-count-updated', {
        detail: cantidadTotal
    }));
}


window.addToCartAndGetNewCount = function (nombre, precio, img) {
    let carrito = getCarrito();
    const precioNumerico = parseFloat(precio);

    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio: precioNumerico, cantidad: 1, img });
    }

    guardarCarrito(carrito);

    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
};

window.getCarritoItems = function () {
    return {
        carritoItems: getCarrito(),

        updateItemQuantity(index, delta) {
            let items = this.carritoItems;

            if (delta === 0) { // Eliminar
                items.splice(index, 1);
            } else { // Sumar o Restar
                items[index].cantidad += delta;
                if (items[index].cantidad <= 0) {
                    items.splice(index, 1);
                }
            }

            this.carritoItems = [...items];
            guardarCarrito(this.carritoItems);
        },

        getTotal() {
            return this.carritoItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
        }
    };
};