import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ cart, isAuthenticated, onLogout }) => {
    return (
        <div className="layout-container">
            <Navbar cart={cart} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main className="main-content">
                <Outlet />
            </main>   
            <Footer />
        </div>
    );
};

export default Layout;