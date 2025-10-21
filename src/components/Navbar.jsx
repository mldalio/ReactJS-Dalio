import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.svg';

const Navbar = ({ cart = [], isAuthenticated, onLogout }) => {
    const totalItems = cart.reduce ((sum, item) => sum + item.quantity, 0);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to ="/" className="nav-logo" onClick={handleLinkClick}>
                <img src={logo} alt="B-Side" className="site-logo" /> 
                </Link>  

                <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    </div>

                

            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <li><Link to ="/products" className="nav-link" onClick={handleLinkClick}>Productos</Link></li>
                <li><Link to ="/cart" className="nav-link" onClick={handleLinkClick}>Carrito ({totalItems})</Link></li>
                {isAuthenticated ? (
                    <>
                    <li><Link to="/checkout" className="nav-link" onClick={handleLinkClick}>Checkout</Link></li>
                    <li>
<button onClick={() => { onLogout(); handleLinkClick(); }} className="primary-btn">Cerrar Sesión</button>                    </li>
                    </>
                ) : (
                    <li><Link to ="/login" className="primary-btn" onClick={handleLinkClick}>Iniciar Sesión</Link></li>
                )}
            </ul>
            </div>
        </nav>
    );
};

export default Navbar;