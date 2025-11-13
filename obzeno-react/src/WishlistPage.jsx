const WishlistPage = ({ wishlist, todosProductos, handleToggleWishlist, handleAddToCart, navegarA }) => {
    // Filtra los productos para mostrar solo los que tienen el ID en la wishlist
    const itemsWishlist = todosProductos.filter(producto => wishlist.includes(producto.id));

    return (
        <section className="carrito page-section">
            <h2>💖 Mi Lista de Deseos</h2>
            <div id="carrito-lista">
                {itemsWishlist.length === 0 ? (
                    <p className="carrito-vacio">Tu lista de deseos está vacía. <a href="#" onClick={() => navegarA('HOME')}>¡Mira nuestras ofertas!</a></p>
                ) : (
                    itemsWishlist.map(item => (
                        <div key={item.id} className="carrito-item">
                            <img src={item.img} alt={item.nombre} className="carrito-img" />
                            <div className="carrito-info">
                                <h4>{item.nombre}</h4>
                                <p>Precio: ${item.precio.toFixed(2)}</p>
                                <p className="precio">Disponible</p>
                            </div>
                            <button onClick={() => handleAddToCart(item.id)} className="agregar-carrito">Añadir al Carrito</button>
                            <button onClick={() => handleToggleWishlist(item.id)}>Eliminar</button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default WishlistPage;