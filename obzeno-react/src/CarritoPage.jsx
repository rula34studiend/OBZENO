const CarritoPage = ({ carrito, handleRemoveFromCart, navegarA }) => {
    
    // Funcion para calcular el total
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return (
        <section className="carrito">
            <h2>🛒 Mi Carrito de Compras</h2>
            <div id="carrito-lista">
                {carrito.length === 0 ? (
                    <p className="carrito-vacio">El carrito está vacío. <a href="#" onClick={() => navegarA('HOME')}>¡Añade productos!</a></p>
                ) : (
                    carrito.map(item => (
                        <div key={item.id} className="carrito-item">
                            /* Asegura de que item.img es la ruta correcta del producto */
                            <img src={item.img} alt={item.nombre} className="carrito-img" />
                            <div className="carrito-info">
                                <h4>{item.nombre}</h4>
                                <p>Cantidad: {item.cantidad}</p>
                                <p>Precio Unitario: ${item.precio.toFixed(2)}</p>
                            </div>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
                        </div>
                    ))
                )}
            </div>
            <p id="carrito-total">Total: ${total.toFixed(2)}</p>
            <div className="botones-carrito">
                <button onClick={() => navegarA('HOME')}>Seguir Comprando</button>
                <button>Proceder al Pago</button>
            </div>
        </section>
    );
};

export default CarritoPage;