import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';

const ProductDetailPage = ({ onAddToCart }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/${productId}`);
                if (!response.ok) throw new Error('Error al cargar el producto');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Producto no encontrado</p>;

    return (
        <div className="product-detail">
            <img src= {product.image} alt={product.name} />
            <div className="product-detail-info">
                <h2>{product.name}</h2>
                <p className="product-price">${product.price}</p>
                <p> {product.description}</p>
                <button onClick={() => onAddToCart(product)}>Agregar al carrito</button>
            </div>
        </div>
    );
}

export default ProductDetailPage;