import React from 'react';

const CartPage = ({ cartItems, onRemoveFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key= {item.id} className="cart-item">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
                        </div>
                    ))}
                    <hr />
                    <div className="cart-total">
                        <strong>Total: ${totalPrice.toFixed(2)}</strong>
                    </div>
                </div>
            )}            
        </div>
    );
};

export default CartPage;