import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <img src={product.coverImage} alt={product.artist} className="product-image" />                
                <h3 className="product-artist">{product.artist}</h3>    
                <h4 className="product-album">{product.album}</h4>
            </Link>
            <p className= "product-price">${product.price}</p>
            <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
                Agregar al carrito
            </button>
        </div>
    );
};

export default ProductCard;
            