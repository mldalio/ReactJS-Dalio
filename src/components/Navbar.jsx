import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cart = [], isAuthenticated, onLogout }) => {
    const totalItems = cart.reduce ((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="navbar">
            <Link to ="/" className="nav-logo"> B-Side </Link>
            <ul className="nav-links">
                <li><Link to ="/products" className="nav-link">Productos</Link></li>
                <li><Link to ="/cart" className="nav-link">Carrito ({totalItems})</Link></li>
                {isAuthenticated ? (
                    <><li><Link to="/checkout" className="nav-link">Checkout</Link></li><button onClick={onLogout} className="logout-btn">Cerrar Sesión</button></>
                ) : (
                    <li><Link to ="/login" className="nav-link">Iniciar Sesión</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;