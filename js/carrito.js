// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".agregar-carrito");
    const contenedorCarrito = document.querySelector(".carrito-items");
    const totalElement = document.querySelector(".total-precio");
    const contadorCarrito = document.querySelector(".cart-item-count");

    // Cargar carrito guardado (si existe)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    actualizarCarrito();

    // Agregar producto
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            const img = boton.getAttribute("data-img");

            // Buscar si ya existe
            const productoExistente = carrito.find(p => p.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, cantidad: 1, img });
            }

            guardarCarrito();
            actualizarCarrito();
        });
    });

    // Actualizar visualmente el carrito
    function actualizarCarrito() {
        if (!contenedorCarrito || !totalElement) return;

        contenedorCarrito.innerHTML = "";
        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("carrito-item");
            item.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" class="carrito-img">
                <div class="carrito-info">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="eliminar-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            contenedorCarrito.appendChild(item);

            total += producto.precio * producto.cantidad;
            cantidadTotal += producto.cantidad;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        if (contadorCarrito) contadorCarrito.textContent = cantidadTotal;

        // Activar botón de eliminar
        const botonesEliminar = document.querySelectorAll(".eliminar-item");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", () => {
                const index = boton.getAttribute("data-index");
                carrito.splice(index, 1);
                guardarCarrito();
                actualizarCarrito();
            });
        });
    }

    // Guardar en localStorage
    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
});