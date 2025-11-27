function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (e) {
        console.error("Error al leer la wishlist de localStorage:", e);
        return [];
    }
}
function saveWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

/**
 * Función global llamada por Alpine.js en los botones de producto.
 * Añade/elimina un producto de la wishlist y devuelve la nueva cuenta.
 */
window.toggleWishlistAndGetNewCount = function (id, nombre, precio, img) {
    let wishlist = getWishlist();
    const itemData = { id, nombre, precio, img };

    const index = wishlist.findIndex(p => p.id === id);

    if (index > -1) {
        // El producto ya existe, lo eliminamos
        wishlist.splice(index, 1);
        console.log(`Producto ${nombre} eliminado de wishlist.`);
    } else {
        // El producto no existe, lo añadimos
        wishlist.push(itemData);
        console.log(`Producto ${nombre} añadido a wishlist.`);
    }

    saveWishlist(wishlist);
    return wishlist.length; // Devuelve la nueva cantidad total
};

// Función para inicializar la WishlistCount de Alpine
window.getWishlistCount = function () {
    return getWishlist().length;
};


// LÓGICA DE LA PÁGINA WISHLIST (DOM Manipulation)
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const contenedorWishlist = document.getElementById("wishlist-items-contenedor");

    // Función para renderizar la lista de deseos
    function renderWishlistPage() {
        const wishlist = getWishlist();
        if (!contenedorWishlist) return;

        contenedorWishlist.innerHTML = ''; // Limpiar el contenedor

        if (wishlist.length === 0) {
            contenedorWishlist.innerHTML = '<p class="wishlist-vacia">Tu lista de deseos está vacía. ¡Añade algunos productos!</p>';
            return;
        }

        wishlist.forEach(producto => {
            const item = document.createElement("div");
            item.classList.add("wishlist-item");
            item.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" class="wishlist-img">
                <div class="wishlist-info">
                    <h4>${producto.nombre}</h4>
                    <p class="precio-item">$${producto.precio.toFixed(2)}</p>
                </div>
                <div class="wishlist-actions">
                    <button class="agregar-carrito-wishlist" 
                            data-nombre="${producto.nombre}" 
                            data-precio="${producto.precio}" 
                            data-img="${producto.img}">
                        AGREGAR AL CARRITO
                    </button>
                    <button class="eliminar-wishlist-item" data-id="${producto.id}">
                        ELIMINAR
                    </button>
                </div>
            `;
            contenedorWishlist.appendChild(item);
        });

        // Activar los eventos de los nuevos botones
        activateWishlistButtons();
    }

    // Activar botones de ELIMINAR y AGREGAR AL CARRITO
    function activateWishlistButtons() {
        // 1. Botones ELIMINAR
        document.querySelectorAll(".eliminar-wishlist-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const idToDelete = e.currentTarget.getAttribute("data-id");
                let wishlist = getWishlist();

                wishlist = wishlist.filter(p => p.id !== idToDelete);
                saveWishlist(wishlist);
                renderWishlistPage(); // Volver a renderizar la página

                // Opcional: Si Alpine.js está disponible, actualiza el contador en la barra
                if (window.Alpine) {
                    window.Alpine.store('wishlistState').count = wishlist.length;
                }
            });
        });

        // 2. Botones AGREGAR AL CARRITO
        document.querySelectorAll(".agregar-carrito-wishlist").forEach(button => {
            button.addEventListener("click", (e) => {
                const nombre = button.getAttribute("data-nombre");
                const precio = parseFloat(button.getAttribute("data-precio"));
                const img = button.getAttribute("data-img");

                // Asumimos que window.addToCartAndGetNewCount existe en carrito.js
                if (window.addToCartAndGetNewCount) {
                    const newCount = window.addToCartAndGetNewCount(nombre, precio, img);

                    // Opcional: Si Alpine.js está disponible, actualiza el contador de carrito en la barra
                    if (window.Alpine) {
                        // Asume que la variable global de Alpine se llama carritoCount
                        document.body.__x.$data.carritoCount = newCount;
                    }

                    alert(`Producto ${nombre} añadido al carrito!`);
                }
            });
        });
    }

    renderWishlistPage();
});