import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ cart, isAuthenticated, onLogout }) => {
    return (
        <div>
            <Navbar cart={cart} isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main className="main-content">
                <Outlet />
            </main>   
            <Footer />
        </div>
    );
};

export default Layout;