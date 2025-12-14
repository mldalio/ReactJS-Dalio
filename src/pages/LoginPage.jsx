import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import loginArt from '../assets/login-art.jpg';
import { useAuth } from '../components/AuthContext'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useAuth();
    
    const from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        navigate(from, {replace:true});
    };

    return (     
        <div className="login-page-background">          
            <div className="login-card">
                <img src={loginArt} alt="Artwork de vinilos" className="login-card-image" />

                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Bienvenido</h2>
                    <p>Inicia sesión para continuar.</p>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="login-btn">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;