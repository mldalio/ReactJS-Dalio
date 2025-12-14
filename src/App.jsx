import React, { useState} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import AllProducts from './pages/AllProducts';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductFormPage from './pages/ProductFormPage';


const CheckOutPage = () => <h2>Página de Checkout (Protegida)</h2>;

const App = () => {    

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {index: true, element: <HomePage/>},
        {path: 'products',element: <AllProducts />},
        {path: 'product/:productId', element: <ProductDetailPage />},  
        {path: 'login', element: <LoginPage />},

        {element: <ProtectedRoute/>,
          children: [
            {path: 'cart', element: <CartPage />},
            {path: 'dashboard', element: <DashboardPage />},
            {path: 'dashboard/new', element: <ProductFormPage />},
            {path: 'dashboard/edit/:id', element: <ProductFormPage />},
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
 
export default App;
