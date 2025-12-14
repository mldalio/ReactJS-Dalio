import React from 'react';
import './CartPage.css';
import { useCart } from '../components/CartContentx';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartPage = () => {
    const {cart,removeFromCart,updateQuantity,clearCart,totalPrice} = useCart();
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleClear = () => {
        clearCart();
        toast.info('🗑️ Carrito vaciado');
    };
       

    const handlePurchase = () => {    
        toast.success('🎉 Compra realizada con éxito', {
            containerId: "center-toast"
        });
        clearCart();
        navigate('/');
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        toast.error('🗑️ Producto eliminado del carrito');
    };

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            
            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="cart-items-list">
                        {cart.map((item) => (
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
                                        <button onClick={() => updateQuantity(item.id, -1)}>
                                        <FaMinus size={12} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>
                                        <FaPlus size={12} />
                                        </button>
                                    </div>
                                    <span className="cart-item-subtotal">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">
                                        <FaTrash size={22}/>
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
                            <button onClick={handleClear} className="clear-cart-btn">
                                Vaciar Carrito
                            </button>
                            <button onClick={handlePurchase} className="confirm-purchase-btn">
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