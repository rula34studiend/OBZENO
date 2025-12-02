let carritoGlobal = [];
document.addEventListener("DOMContentLoaded", async function() {
    await new Promise(r => setTimeout(r, 200));
    const user = await window.getUsuarioActual();

    if (user) {
        console.log("🟢 [Carrito] Usuario detectado:", user.email);
        const localCart = JSON.parse(localStorage.getItem("carrito")) || [];
        if (localCart.length > 0) {
            console.log("⬆️ Subiendo carrito local a la nube...");
            for (const item of localCart) {
                for(let i=0; i<item.cantidad; i++) {
                    await window.agregarItemNube(item);
                }
            }
            localStorage.removeItem("carrito");
        }
        carritoGlobal = await window.obtenerCarritoNube();
    } else {
        console.log("🟠 [Carrito] Modo Invitado (LocalStorage).");
        carritoGlobal = JSON.parse(localStorage.getItem("carrito")) || [];
    }

    actualizarInterfaz();
});

window.addToCartAndGetNewCount = async function (nombre, precio, img) {
    const user = await window.getUsuarioActual();
    const precioNum = parseFloat(precio);

    if (user) {
        await window.agregarItemNube({ nombre, precio: precioNum, img });
        carritoGlobal = await window.obtenerCarritoNube();
    } else {
        const item = carritoGlobal.find(p => p.nombre === nombre);
        if (item) {
            item.cantidad++;
        } else {
            carritoGlobal.push({ nombre, precio: precioNum, cantidad: 1, img });
        }
        localStorage.setItem("carrito", JSON.stringify(carritoGlobal));
    }

    actualizarInterfaz();
    alert(`¡${nombre} agregado al carrito!`); // Feedback inmediato
    return carritoGlobal.reduce((acc, item) => acc + item.cantidad, 0);
};

function actualizarInterfaz() {
    const totalItems = carritoGlobal.reduce((acc, item) => acc + item.cantidad, 0);
    const root = document.querySelector('[x-data]');
    if (root && root.__x) {
        root.__x.$data.carritoCount = totalItems;
    }
    const contenedor = document.getElementById("carrito-items-contenedor");
    const totalElem = document.getElementById("carrito-total");

    if (contenedor && totalElem) {
        renderizarPaginaCarrito(contenedor, totalElem);
    }
}

function renderizarPaginaCarrito(contenedor, totalElem) {
    contenedor.innerHTML = "";

    if (carritoGlobal.length === 0) {
        contenedor.innerHTML = "<p class='carrito-vacio'>Tu carrito está vacío 😢</p>";
        totalElem.innerHTML = "Total: $0.00";
        return;
    }

    let totalDinero = 0;

    carritoGlobal.forEach((item) => {
        const precioNum = parseFloat(item.precio);
        const subtotal = precioNum * item.cantidad;
        totalDinero += subtotal;

        const itemHTML = document.createElement("div");
        itemHTML.classList.add("carrito-item");
        itemHTML.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}" class="carrito-img">
            <div class="carrito-info">
                <h4>${item.nombre}</h4>
                <p>Precio: $${precioNum.toFixed(2)}</p>
                
                <div class="carrito-controles">
                    <button onclick="modificarCantidad('${item.nombre}', -1)">-</button>
                    <span style="font-weight:bold; margin:0 10px;">${item.cantidad}</span>
                    <button onclick="modificarCantidad('${item.nombre}', 1)">+</button>
                </div>
            </div>
            <button class="eliminar-item" onclick="eliminarDelTodo('${item.nombre}')">
                <i class="ri-delete-bin-line"></i>
            </button>
        `;
        contenedor.appendChild(itemHTML);
    });

    totalElem.innerHTML = `Total: $${totalDinero.toFixed(2)}`;
}

window.modificarCantidad = async function(nombre, delta) {
    const user = await window.getUsuarioActual();

    if (user) {
        if (delta > 0) await window.agregarItemNube({ nombre });
        else await window.reducirItemNube(nombre);
        carritoGlobal = await window.obtenerCarritoNube();
    } else {
        const item = carritoGlobal.find(p => p.nombre === nombre);
        if (item) {
            item.cantidad += delta;
            if (item.cantidad <= 0) {
                carritoGlobal = carritoGlobal.filter(p => p.nombre !== nombre);
            }
        }
        localStorage.setItem("carrito", JSON.stringify(carritoGlobal));
    }
    actualizarInterfaz();
};

window.eliminarDelTodo = async function(nombre) {
    const user = await window.getUsuarioActual();
    if (user) {
        await window.eliminarItemNubeTotal(nombre);
        carritoGlobal = await window.obtenerCarritoNube();
    } else {
        carritoGlobal = carritoGlobal.filter(p => p.nombre !== nombre);
        localStorage.setItem("carrito", JSON.stringify(carritoGlobal));
    }
    actualizarInterfaz();
};