import React, { useEffect } from 'react';
import './App.css'; 
import 'remixicon/fonts/remixicon.css';
import 'swiper/css';
import 'swiper/css/navigation';


// =================================================================
// 🚨 CORRECCIÓN: IMPORTAR TODAS LAS IMÁGENES DESDE src/assets/img
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

function App() {
    
    // Este useEffect inicializa el carrusel DESPUÉS de que se renderiza el HTML.
    useEffect(() => {
    if (window.Swiper) {
        // Asegúrate de que esta configuración es correcta
        const swiper = new window.Swiper('.swiper', {
            loop: true,
            // 🚨 ESTO ES CRUCIAL PARA LA NAVEGACIÓN MANUAL
            navigation: { 
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // 🚨 ESTO ES CRUCIAL PARA EL AVANCE AUTOMÁTICO (autoplay)
            autoplay: {
                delay: 3000, // Cambia cada 5 segundos (por ejemplo)
                disableOnInteraction: true, // Continúa deslizando incluso si el usuario interactúa
            },
            // Otros parámetros (como pagination, effect, etc., si los tenías)
            // ... 
        });

        return () => {
            swiper.destroy();
        };
    } else {
        console.error("Error: La biblioteca Swiper no se encontró.");
    }
}, []);

    const scrollToOfertas = () => {
        document.getElementById('ofertas-especiales').scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddToCart = (nombre, precio, img) => {
        // Implementa tu lógica de carrito con estado de React aquí
        console.log(`Agregando ${nombre} con precio ${precio} y imagen ${img} al carrito.`);
    };

    return (
        <div className="App">
            <header>
                <div className="logo">
                    <h1>OBZENO</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">INICIO</a></li>
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
                        <li><a href="#">INICIAR SESION</a></li>
                        <a href="carrito.html" className="cartTab" id="cartLink" aria-label="Ver carrito">
                            <i className="ri-shopping-cart-line"></i>
                            <div className="cart-item-count" id="cartCount">0</div>
                        </a>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <h4>BIENVENIDOS A OBZENO</h4>
                    <button onClick={scrollToOfertas}>
                        VER OFERTAS ESPECIALES
                    </button>
                </div>
            </section>

            <section className="carrusel">
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <div className="swiper-slide"><img src={Carrusel1} alt="Imagen 1" /></div>
                        <div className="swiper-slide"><img src={Carrusel2} alt="Imagen 2" /></div>
                        <div className="swiper-slide"><img src={Carrusel3} alt="Imagen 3" /></div>
                        <div className="swiper-slide"><img src={Carrusel4} alt="Imagen 4" /></div>
                    </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </div>
            </section>

            <section className="procutos-destacados">
                <div className="Productos-destacados">
                    <h4>OBZENO</h4>
                    <h5>PRODUCTOS DESTACADOS</h5>
                </div>
                <div className="productos">

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Destacado1} alt="Camiseta geek 1" />
                        <h3>BEAST BREATHING</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("BEAST BREATHING", "270.00", Destacado1)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Destacado2} alt="Camiseta geek 1" />
                        <h3>RETRO GAMES</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("RETRO GAMES", "270.00", Destacado2)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Destacado3} alt="Camiseta geek 1" />
                        <h3>VENDETTA</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("VENDETTA", "270.00", Destacado3)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div id="carrito-contenedor"></div>
                </div>
            </section>

            <section className="ofertas-especiales" id="ofertas-especiales">
                <h2> OFERTAS ESPECIALES </h2>
                <div className="productos">
                    
                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta1} alt="Camiseta geek 1" />
                        <h3>A clockwork orange</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("A clockwork orange", "270.00", Oferta1)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>
                    
                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta2} alt="Camiseta geek 1" />
                        <h3>VIRGEN CARAS</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("VIRGEN CARAS", "270.00", Oferta2)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>
                    
                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta3} alt="Camiseta geek 1" />
                        <h3>ROBERT JOHNSON</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("ROBERT JOHNSON", "270.00", Oferta3)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta4} alt="Camiseta geek 1" />
                        <h3>REBEL FORCES</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("REBEL FORCES", "270.00", Oferta4)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta5} alt="Camiseta geek 1" />
                        <h3>GHOST 2025</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("GHOST 2025", "270.00", Oferta5)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta6} alt="Camiseta geek 1" />
                        <h3>KILLERS VIÑETAS</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("KILLERS VIÑETAS", "270.00", Oferta6)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta7} alt="Camiseta geek 1" />
                        <h3>APROBADO POR CHAYANNE</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("APROBADO POR CHAYANNE", "270.00", Oferta7)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                    <div className="producto">
                        {/* USO DE VARIABLES IMPORTADAS */}
                        <img src={Oferta8} alt="Camiseta geek 1" />
                        <h3>LACAN</h3>
                        <p className="precio"> $270.00 </p>
                        <button 
                            className="agregar-carrito" 
                            onClick={() => handleAddToCart("LACAN", "270.00", Oferta8)}
                        >
                            AGREGAR AL CARRITO
                        </button>
                    </div>

                </div>
            </section>

            <footer>
                <p>&copy; 2025 OBZENO. Todos los derechos reservedos por R34.</p>
                <a href="contacto.html" className="btn-contacto">CONTACTAR</a>
            </footer>

        </div>
    );
}

export default App;