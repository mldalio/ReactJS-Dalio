import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductFormPage.css';

const API_URL = 'https://68eed9e6b06cc802829b7689.mockapi.io/vinyls';

const ProductFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const [formData, setFormData] = useState({
        artist: '',
        album: '',      
        price: '',
        coverImage: '',
        description: '' 
    });
    const [loading, setLoading] = useState(false);

    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_URL}/${id}`);
                    if (!response.ok) throw new Error("No encontrado");
                    const data = await response.json();
                    
                    setFormData({
                        artist: data.artist || '',
                        album: data.album || data.name || '',
                        price: data.price || '',
                        coverImage: data.coverImage || data.image || '',
                        description: data.description || '' 
                    });
                } catch (error) {
                    toast.error("Error al cargar datos");
                    navigate('/dashboard');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.album.trim()) {
            toast.warning("El nombre del álbum es obligatorio.");
            return false;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            toast.warning("El precio debe ser mayor a 0.");
            return false;
        }
               
        if (!formData.coverImage.trim()) {
            toast.warning("La URL de la imagen es obligatoria.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);

        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `${API_URL}/${id}` : API_URL;

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(isEditing ? "¡Vinilo actualizado!" : "¡Vinilo creado con éxito!");
                navigate('/dashboard'); 
            } else {
                throw new Error("Falló la operación");
            }

        } catch (error) {
            toast.error("Hubo un error al guardar.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing && !formData.album) return <p>Cargando datos...</p>;

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Vinilo' : 'Nuevo Vinilo'}</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
                
                <div className="form-group">
                    <label>Artista:</label>
                    <input 
                        type="text" name="artist" 
                        value={formData.artist} onChange={handleChange} 
                        placeholder="Ej: Metallica"
                    />
                </div>

                <div className="form-group">
                    <label>Nombre del Álbum (*):</label>
                    <input 
                        type="text" name="album" 
                        value={formData.album} onChange={handleChange} 
                        placeholder="Ej: Master of Puppets"
                    />
                </div>
             

                <div className="form-group">
                    <label>Precio ($):</label>
                    <input 
                        type="number" name="price" step="0.01"
                        value={formData.price} onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label>URL de Imagen:</label>
                    <input 
                        type="url" name="coverImage" 
                        placeholder="https://..."
                        value={formData.coverImage} onChange={handleChange} 
                    />
                    {formData.coverImage && (
                        <img src={formData.coverImage} alt="Preview" className="img-preview"/>
                    )}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/dashboard')} className="cancel-btn">
                        Cancelar
                    </button>
                    <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductFormPage;