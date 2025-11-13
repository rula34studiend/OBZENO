import React, { useEffect, useState } from 'react';
import './App.css';
import 'remixicon/fonts/remixicon.css';
import 'swiper/css';
import 'swiper/css/navigation';

// IMPORTACION DE NUEVOS COMPONENTES
import CarritoPage from './CarritoPage';
import WishlistPage from './WishlistPage';
import LoginPage from './LoginPage';

// =================================================================
// IMPORTACIONES DE IMAGENES Y PRODUCTOS
// =================================================================

// CARRUSEL
import Carrusel1 from './assets/CARRUSEL/Carrusel1.jpg';
import Carrusel2 from './assets/CARRUSEL/Carrusel2.jpg';
import Carrusel3 from './assets/CARRUSEL/Carrusel3.jpg';
import Carrusel4 from './assets/CARRUSEL/Carrusel4.jpg';

// DESTACADOS
import Destacado1 from './assets/DESTACADOS/Destacado1.jpg';
import Destacado2 from './assets/DESTACADOS/Destacado2.jpg';
import Destacado3 from './assets/DESTACADOS/Destacado3.jpg';

// OFERTAS
import Oferta1 from './assets/OFERTAS/Oferta1.jpg';
import Oferta2 from './assets/OFERTAS/Oferta2.jpg';
import Oferta3 from './assets/OFERTAS/Oferta3.jpg';
import Oferta4 from './assets/OFERTAS/Oferta4.jpg';
import Oferta5 from './assets/OFERTAS/Oferta5.jpg';
import Oferta6 from './assets/OFERTAS/Oferta6.jpg';
import Oferta7 from './assets/OFERTAS/Oferta7.jpg';
import Oferta8 from './assets/OFERTAS/Oferta8.jpg';

const PRODUCTOS_DESTACADOS = [
    { id: 1, nombre: "BEAST BREATHING", precio: 270.00, img: Destacado1, tipo: 'DESTACADO' },
    { id: 2, nombre: "RETRO GAMES", precio: 270.00, img: Destacado2, tipo: 'DESTACADO' },
    { id: 3, nombre: "VENDETTA", precio: 270.00, img: Destacado3, tipo: 'DESTACADO' },
];

const PRODUCTOS_OFERTAS = [
    { id: 4, nombre: "A clockwork orange", precio: 270.00, img: Oferta1, tipo: 'OFERTA' },
    { id: 5, nombre: "VIRGEN CARAS", precio: 270.00, img: Oferta2, tipo: 'OFERTA' },
    { id: 6, nombre: "ROBERT JOHNSON", precio: 270.00, img: Oferta3, tipo: 'OFERTA' },
    { id: 7, nombre: "REBEL FORCES", precio: 270.00, img: Oferta4, tipo: 'OFERTA' },
    { id: 8, nombre: "GHOST 2025", precio: 270.00, img: Oferta5, tipo: 'OFERTA' },
    { id: 9, nombre: "KILLERS VIÑETAS", precio: 270.00, img: Oferta6, tipo: 'OFERTA' },
    { id: 10, nombre: "APROBADO POR CHAYANNE", precio: 270.00, img: Oferta7, tipo: 'OFERTA' },
    { id: 11, nombre: "LACAN", precio: 270.00, img: Oferta8, tipo: 'OFERTA' },
];

export const TODOS_LOS_PRODUCTOS = [...PRODUCTOS_DESTACADOS, ...PRODUCTOS_OFERTAS];


function App() {

    // ESTADOS GLOBALES
    const [carrito, setCarrito] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    // ESTADO DE NAVEGACION
    const [paginaActual, setPaginaActual] = useState('HOME');

    // LOGICA DE NAVEGACION
    const navegarA = (pagina) => {
        setPaginaActual(pagina);
    };

    // LOGICA DE WISHLIST
    const handleToggleWishlist = (productId) => {
        const isWishlisted = wishlist.includes(productId);
        if (isWishlisted) {
            setWishlist(wishlist.filter(id => id !== productId));
        } else {
            setWishlist([...wishlist, productId]);
        }
    };

    // L
    // LOGICA DE CARRITO PARA AÑADIR
    const handleAddToCart = (productId) => {
        const productoExistente = carrito.find(item => item.id === productId);
        if (productoExistente) {
            setCarrito(carrito.map(item =>
                item.id === productId ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            const nuevoProducto = TODOS_LOS_PRODUCTOS.find(p => p.id === productId);
            setCarrito([...carrito, { ...nuevoProducto, cantidad: 1 }]);
        }
    };

    // LOGICA DE CARRITO PARA ELIMINAR
    const handleRemoveFromCart = (productId) => {
        setCarrito(carrito.filter(item => item.id !== productId));
    };

    // Inicializacion del Carrusel
    useEffect(() => {
        // ... (Tu código de inicialización de Swiper)
    }, []);

    const scrollToOfertas = () => {
        // La sección de ofertas ahora está dentro del wrapper, por lo que se desplazará correctamente
        document.getElementById('ofertas-especiales').scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <div className="App">

            {/* HEADER Y NAVEGACIÓN - FUERA DEL WRAPPER PARA ANCHO COMPLETO */}
            <header>
                <div className="logo">
                    <h1>OBZENO</h1>
                </div>
                <nav>
                    <ul>
                        {/* NAVEGACIÓN HOME */}
                        <li><a href="#" onClick={() => navegarA('HOME')}>INICIO</a></li>
                        <li>
                            <a href="#">TIENDA DE ROPA</a>
                            <ul className="submenu">
                                <li><a href="hombre.html">HOMBRES</a></li>
                                <li><a href="#">MUJERES</a></li>
                                <li><a href="#">NIÑO</a></li>
                                <li><a href="#">SUDADERAS</a></li>
                                <li><a href="#">TENIS</a></li>
                            </ul>
                        </li>
                        <li><a href="#">ROPA DE PELICULAS</a></li>
                        <li><a href="#">ROPA DE ANIME</a></li>
                        <li><a href="#">FIGURAS</a></li>
                        {/* NAVEGACIÓN LOGIN */}
                        <li><a href="#" onClick={() => navegarA('LOGIN')}>INICIAR SESION</a></li>

                        {/* NAVEGACIÓN CARRITO */}
                        <a href="#" className="cartTab" id="cartLink" aria-label="Ver carrito" onClick={() => navegarA('CARRITO')}>
                            <i className="ri-shopping-cart-line"></i>
                            <div className="cart-item-count" id="cartCount">{carrito.length}</div>
                        </a>

                        {/* NAVEGACIÓN WISHLIST */}
                        <div className="wishlist-count-display" onClick={() => navegarA('WISHLIST')}>
                            <i className="ri-heart-line"></i>
                            <div className="wishlist-item-count">{wishlist.length}</div>
                        </div>
                    </ul>
                </nav>
            </header>

            {/* HERO - FUERA DEL WRAPPER PARA ANCHO COMPLETO */}
            {paginaActual === 'HOME' && (
                <section className="hero">
                    <div className="hero-content">
                        <h4>BIENVENIDOS A OBZENO</h4>
                        <button onClick={scrollToOfertas}>
                            VER OFERTAS ESPECIALES
                        </button>
                    </div>
                </section>
            )}

            {/* CARRUSEL - FUERA DEL WRAPPER PARA ANCHO COMPLETO */}
            {paginaActual === 'HOME' && (
                <section className="carrusel">
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide"><img src={Carrusel1} alt="Imagen 1" /></div>
                            <div className="swiper-slide"><img src={Carrusel2} alt="Imagen 2" /></div>
                            <div className="swiper-slide"><img src={Carrusel3} alt="Imagen 3" /></div>
                            <div className="swiper-slide"><img src={Carrusel4} alt="Imagen 4" /></div>
                        </div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                </section>
            )}


            {/* ============================================== */}
            {/* CONTENEDOR GENERAL PARA CONTENIDO LIMITADO/CENTRADO */}
            {/* ============================================== */}
            <div className="main-content-wrapper">

                {paginaActual === 'HOME' && (
                    <React.Fragment>
                        {/* SECCIONES DE PRODUCTOS DENTRO DEL WRAPPER */}
                        <section className="procutos-destacados">
                            <div className="Productos-destacados">
                                <h4>OBZENO</h4>
                                <h5>PRODUCTOS DESTACADOS</h5>
                            </div>

                            <div className="productos">
                                {PRODUCTOS_DESTACADOS.map(producto => (
                                    <div className="producto" key={producto.id}>

                                        {/* 🚨 BOTÓN DE WISHLIST MODIFICADO 🚨 */}
                                        <button
                                            className={`wishlist-button ${wishlist.includes(producto.id) ? 'active' : ''}`}
                                            onClick={() => handleToggleWishlist(producto.id)}
                                        >
                                            <i className={wishlist.includes(producto.id) ? "ri-heart-fill" : "ri-heart-line"}></i>
                                            {wishlist.includes(producto.id) ? " EN WISHLIST" : " AÑADIR A WISHLIST"}
                                        </button>
                                        {/* 🚨 FIN DEL BOTÓN DE WISHLIST MODIFICADO 🚨 */}

                                        <img src={producto.img} alt={producto.nombre} />
                                        <h3>{producto.nombre}</h3>
                                        <p className="precio"> ${producto.precio.toFixed(2)} </p>
                                        <button
                                            className="agregar-carrito"
                                            onClick={() => handleAddToCart(producto.id)}
                                        >
                                            AGREGAR AL CARRITO
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="ofertas-especiales" id="ofertas-especiales">
                            <h2> OFERTAS ESPECIALES </h2>

                            <div className="productos">
                                {PRODUCTOS_OFERTAS.map(producto => (
                                    <div className="producto" key={producto.id}>

                                        {/* 🚨 BOTÓN DE WISHLIST MODIFICADO 🚨 */}
                                        <button
                                            className={`wishlist-button ${wishlist.includes(producto.id) ? 'active' : ''}`}
                                            onClick={() => handleToggleWishlist(producto.id)}
                                        >
                                            <i className={wishlist.includes(producto.id) ? "ri-heart-fill" : "ri-heart-line"}></i>
                                            {wishlist.includes(producto.id) ? " EN WISHLIST" : " AÑADIR A WISHLIST"}
                                        </button>
                                        {/* 🚨 FIN DEL BOTÓN DE WISHLIST MODIFICADO 🚨 */}

                                        <img src={producto.img} alt={producto.nombre} />
                                        <h3>{producto.nombre}</h3>
                                        <p className="precio"> ${producto.precio.toFixed(2)} </p>
                                        <button
                                            className="agregar-carrito"
                                            onClick={() => handleAddToCart(producto.id)}
                                        >
                                            AGREGAR AL CARRITO
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </React.Fragment>
                )}

                {/* PÁGINAS SECUNDARIAS DENTRO DEL WRAPPER */}
                {paginaActual === 'CARRITO' && (
                    <CarritoPage
                        carrito={carrito}
                        handleRemoveFromCart={handleRemoveFromCart}
                        navegarA={navegarA}
                    />
                )}

                {paginaActual === 'WISHLIST' && (
                    <WishlistPage
                        wishlist={wishlist}
                        todosProductos={TODOS_LOS_PRODUCTOS}
                        handleToggleWishlist={handleToggleWishlist}
                        handleAddToCart={handleAddToCart}
                        navegarA={navegarA}
                    />
                )}

                {paginaActual === 'LOGIN' && (
                    <LoginPage navegarA={navegarA} />
                )}

            </div> {/* CIERRE DEL CONTENEDOR GENERAL */}


            {/* FOOTER - FUERA DEL WRAPPER PARA ANCHO COMPLETO */}
            <footer>
                <p>&copy; 2025 OBZENO. Todos los derechos reservedos por R34.</p>
                <a href="contacto.html" className="btn-contacto">CONTACTAR</a>
            </footer>

        </div>
    );
}

export default App;