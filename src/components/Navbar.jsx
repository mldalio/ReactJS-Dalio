import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.svg';

const Navbar = ({ cart = [], isAuthenticated, onLogout }) => {
    const totalItems = cart.reduce ((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to ="/" className="nav-logo">
                <img src={logo} alt="B-Side" className="site-logo" /> 
                </Link>              
            <ul className="nav-links">
                <li><Link to ="/products" className="nav-link">Productos</Link></li>
                <li><Link to ="/cart" className="nav-link">Carrito ({totalItems})</Link></li>
                {isAuthenticated ? (
                    <>
                    <li><Link to="/checkout" className="nav-link">Checkout</Link></li>
                    <li>
                    <button onClick={onLogout} className="primary-btn">Cerrar Sesión</button>
                    </li>
                    </>
                ) : (
                    <li><Link to ="/login" className="primary-btn">Iniciar Sesión</Link></li>
                )}
            </ul>
            </div>
        </nav>
    );
}

export default Navbar;