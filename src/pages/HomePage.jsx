import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';

const categories = [
  { name: 'Rock', image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=500' },
  { name: 'Metal', image: 'https://images.unsplash.com/photo-1516279923833-25a171d3221b?w=500' },
  { name: 'Pop', image: 'https://images.unsplash.com/photo-1508700115892-45ecd056271a?w=500' },
  { name: 'Jazz', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67d629?w=500' }
];

const HomePage = ({ onAddToCart }) => {
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

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="homepage">
            <section className="hero">
                <div className="hero-content">
                <h1>Bienvenido a B-Side</h1>
                <p>Tu tienda online de vinilos</p>
                </div>
                </section>

                <section className="categories-section">
                    <h2>Explorá por Géneros</h2>
                    <div className="categories-grid">
                        {categories.map((category) => (
                            <div key={category.name} className="category-card">
                                <img src={category.image} alt={category.name} className="category-image" />
                                <div className="category-name">{category.name}</div>
                            </div>
                        ))}
                    </div>                    
                </section>

            <section className="products-section">
                <div className="section-header">
                    <h2>Nuestra colección</h2>
                    <Link to="/products" className="view-all">Ver todos</Link>
                    {loading && <p>Cargando productos...</p>}
                    {error && <p>Error: {error}</p>}
                </div>
                <div className="products-grid">
                    {products.slice(0,8).map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                    ))}
                </div>
            </section>
        </div>
    );
};
            
export default HomePage;
