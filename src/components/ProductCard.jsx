import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      
        <img
          src={product.coverImage}
          alt={`${product.artist} - ${product.album}`}
          className="product-image"
        />
      
      <div className="product-info">
        <div>         
          <h3 className="product-artist">{product.artist}</h3>
          <h4 className="product-album">{product.album}</h4>
          <p className="product-price">${product.price}</p>
        </div>

        <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
            