import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import './AllProducts.css';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';
const ITEMS_PER_PAGE = 8;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // CORREGIDO 1: Inicializamos como string vacío '', NO como array []
    const [searchTerm, setSearchTerm] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);

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
                toast.error("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase(); 
        return (
            product.artist.toLowerCase().includes(term) ||
            (product.album || product.name || '').toLowerCase().includes(term)
        );
    });

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    if (loading) return <p className="loader">Cargando productos...</p>;

    return (
        <div className="all-products-container">

            <Helmet>
                <title>B-Side | Catálogo de Vinilos</title>
                <meta name="description" content="Explora nuestro catálogo completo de vinilos. Encuentra tus álbumes favoritos y descubre nuevas joyas musicales en B-Side." />
                <meta name="keywords" content="vinilos, catálogo de vinilos, música en vinilo, álbumes de vinilo, comprar vinilos, B-Side" />
            </Helmet>

            <div className="catalog-header">
                <h2>Catálogo Completo</h2>
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por artista o álbum..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        aria-label='Buscar productos por nombre o artista'
                    />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="products-grid">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <p>No encontramos nada con "{searchTerm}" 🎸</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="pagination" role="navigation" aria-label="Paginación de productos">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Página anterior"
                    >
                        <FaArrowLeft /> Anterior
                    </button>

                    <span className="page-info">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Página siguiente"
                    >
                        Siguiente <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProducts;