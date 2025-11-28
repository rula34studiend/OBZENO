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

    window.dispatchEvent(new CustomEvent('wishlist-count-updated', {
        detail: wishlist.length
    }));
}

window.toggleWishlistAndGetNewCount = function (id, nombre, precio, img) {
    let wishlist = getWishlist();
    // Aseguramos que el ID sea string para comparar consistentemente
    const idString = String(id);
    const itemData = { id: idString, nombre, precio, img };

    const index = wishlist.findIndex(p => String(p.id) === idString);

    if (index > -1) {
        wishlist.splice(index, 1);
        console.log(`Producto ${nombre} eliminado de wishlist.`);
    } else {
        wishlist.push(itemData);
        console.log(`Producto ${nombre} añadido a wishlist.`);
    }

    saveWishlist(wishlist); // Esto dispara el evento automáticamente
    return wishlist.length;
};

window.getWishlistCount = function () {
    return getWishlist().length;
};

document.addEventListener("DOMContentLoaded", function() {
    const contenedorWishlist = document.getElementById("wishlist-items-contenedor");

    if (!contenedorWishlist) return;

    function renderWishlistPage() {
        const wishlist = getWishlist();
        contenedorWishlist.innerHTML = ''; // Limpiar

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

        activateWishlistButtons();
    }

    function activateWishlistButtons() {
        document.querySelectorAll(".eliminar-wishlist-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const idToDelete = String(e.currentTarget.getAttribute("data-id"));
                let wishlist = getWishlist();

                wishlist = wishlist.filter(p => String(p.id) !== idToDelete);


                saveWishlist(wishlist);

                renderWishlistPage();
            });
        });

        document.querySelectorAll(".agregar-carrito-wishlist").forEach(button => {
            button.addEventListener("click", (e) => {
                const nombre = button.getAttribute("data-nombre");
                const precio = parseFloat(button.getAttribute("data-precio"));
                const img = button.getAttribute("data-img");

                if (window.addToCartAndGetNewCount) {
                    window.addToCartAndGetNewCount(nombre, precio, img);
                    alert(`Producto ${nombre} añadido al carrito!`);
                }
            });
        });
    }

    renderWishlistPage();
});