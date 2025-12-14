import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './HomePage.css';
import rockImage from '../assets/rock.jpeg';
import metalImage from '../assets/metal.jpg';
import popImage from '../assets/pop.jpg';
import jazzImage from '../assets/jazz.webp';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';

const categories = [
  { name: 'Rock', image: rockImage },
  { name: 'Metal', image: metalImage },
  { name: 'Pop', image: popImage },
  { name: 'Jazz', image: jazzImage }
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
                <h1>Los mejores vinilos para tu colección</h1>
                <p>¡Descubrí nuestra tienda con ediciones únicas y nuevos lanzamientos!</p>
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
