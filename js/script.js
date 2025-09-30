document.addEventListener('DOMContentLoaded', () => {
    // Elementos principales
    const btnAbrir = document.getElementById('abrir-carrito');
    const carritoContenido = document.getElementById('carrito-contenido');
    const btnCerrar = document.getElementById('cerrar-carrito');
    const carritoProductosNode = document.getElementById('carrito-productos');
    const subtotalNode = document.getElementById('subtotal');

    if (!btnAbrir) console.error('No se encontró #abrir-carrito en el DOM');
    if (!carritoContenido) console.error('No se encontró #carrito-contenido en el DOM');

    // Estado del carrito
    let carrito = [];
    let totalCarrito = 0;

    // Abrir / cerrar carrito
    btnAbrir && btnAbrir.addEventListener('click', () => {
        carritoContenido.classList.add('active');
    });
    btnCerrar && btnCerrar.addEventListener('click', () => {
        carritoContenido.classList.remove('active');
    });

    // Funciones del carrito
    function actualizarContadorCarrito() {
        const contador = carrito.reduce((sum, p) => sum + (p.cantidad || 0), 0);
        if (btnAbrir) btnAbrir.textContent = `CARRITO (${contador})`;
    }

    function actualizarCarrito() {
        carritoProductosNode.innerHTML = '';

        if (carrito.length === 0) {
            carritoProductosNode.innerHTML = '<p>El carrito está vacío</p>';
            subtotalNode.innerText = 'SUBTOTAL: $0.00';
            return;
        }

        carrito.forEach((item, index) => {
            const row = document.createElement('div');
            row.classList.add('carrito-producto');
            row.innerHTML = `
        <p>${item.nombre} (Cantidad: ${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
            carritoProductosNode.appendChild(row);
        });

        const total = carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);
        totalCarrito = total;
        subtotalNode.innerText = `SUBTOTAL: $${totalCarrito.toFixed(2)}`;
    }

    function agregarAlCarrito(producto) {
        if (!producto || !producto.nombre) return;
        const existente = carrito.find(p => p.nombre === producto.nombre);
        if (existente) {
            existente.cantidad = (existente.cantidad || 0) + (producto.cantidad || 1);
        } else {
            // aseguramos estructura
            carrito.push({ nombre: producto.nombre, precio: Number(producto.precio) || 0, cantidad: producto.cantidad || 1 });
        }
        actualizarContadorCarrito();
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        index = Number(index);
        if (isNaN(index) || index < 0 || index >= carrito.length) return;
        carrito.splice(index, 1);
        actualizarContadorCarrito();
        actualizarCarrito();
    }

    // Delegación de eventos para botones dinámicos
    document.body.addEventListener('click', (e) => {
        const el = e.target;

        // botón "Agregar al carrito"
        if (el.matches('.agregar-carrito')) {
            const nombre = el.dataset.nombre;
            const precio = parseFloat(el.dataset.precio) || 0;
            agregarAlCarrito({ nombre, precio, cantidad: 1 });
            return;
        }

        // botón "Eliminar" dentro del carrito
        if (el.matches('.eliminar')) {
            const idx = el.dataset.index;
            eliminarDelCarrito(idx);
            return;
        }
    });

    // Inicializa contador y vista vacía
    actualizarContadorCarrito();
    actualizarCarrito();
});
