import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './AllProducts.css';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';

const AllProducts = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }   
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="all-products-container">
            <h1>Todo nuestro catálogo</h1>
            {loading && <p>Cargando productos...</p>}
            {error && <p>Error: {error}</p>}
            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;