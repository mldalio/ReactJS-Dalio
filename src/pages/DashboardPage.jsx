import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import './DashboardPage.css';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            toast.error('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este vinilo?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Vinilo eliminado con éxito');
                setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
                
            } else {
                const errorText = await response.text();
                console.error("❌ Error del servidor:", errorText);
                throw new Error('Error al eliminar el vinilo');
            }
        } catch (error) {
            console.error("🚨 Error de red o excepción:", error);
            toast.error('Error al eliminar el vinilo');
        }
    };

    if (loading) <p className='loading-text'>Cargando panel...</p>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Panel de Administración</h2>
                <Link to="/dashboard/new" className="create-btn">
                    <FaPlus /> Agregar Nuevo Vinilo
                </Link>
            </div>

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th> Imagen</th>
                        <th> Artista</th>
                        <th> Álbum</th>
                        <th> Precio</th>
                        <th> Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={product.coverImage || product.image}
                                    alt="cover"
                                    className='table-img'
                                />
                            </td>
                            <td>{product.artist}</td>
                            <td>{product.album || product.title}</td>
                            <td>{product.price}</td>
                            <td className='actions-cell'>
                                <Link to={`/dashboard/edit/${product.id}`} className="edit-btn">                                    <FaEdit />
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className='delete-btn'>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardPage;


                           


