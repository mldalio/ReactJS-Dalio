import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>   
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme='dark'/>
            <ToastContainer
            enableMultiContainer
            containerId="center-toast"
            position='top-center'
            theme='dark'
            newestOnTop={true}
            className="toast-center-container"
            />


        </div>
    );
};

export default Layout;