// Mostrar cantidad total de productos en el carrito (en todas las páginas)
document.addEventListener("DOMContentLoaded", () => {
    const contadorCarrito = document.querySelector(".cart-item-count");

    if (contadorCarrito) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contadorCarrito.textContent = cantidadTotal;
    }
});