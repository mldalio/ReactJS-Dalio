import React from 'react';
import './CartPage.css';

const CartPage = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onClearCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleConfirmPurchase = () => {
        alert('¡Compra confirmada! Gracias por tu compra.');
        onClearCart();
    };

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">

                                <div className="cart-item-info">
                                    <img src={item.coverImage || item.image} alt={item.album} className="cart-item-image" />
                                    <div className="cart-item-details">
                                      <span className="cart-item-artist">{item.artist}</span>
                                      <span className="cart-item-album">{item.album}</span>
                                    </div>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                                    </div>
                                    <span className="cart-item-subtotal">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button onClick={() => onRemoveFromCart(item.id)} className="remove-item-btn">
                                        &times;
                                    </button>
                                </div>
                            </div> 
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="cart-total">
                            <strong>Total: ${totalPrice.toFixed(2)}</strong>
                        </div>
                        <div className="cart-actions">
                            <button onClick={() => { onClearCart(); alert('Carrito vaciado'); }} className="clear-cart-btn">
                                Vaciar Carrito
                            </button>
                            <button onClick={handleConfirmPurchase} className="confirm-purchase-btn">
                                Confirmar Compra
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;