import React, { useState} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import AllProducts from './pages/AllProducts';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';


const CheckOutPage = () => <h2>Página de Checkout (Protegida)</h2>;

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === productToAdd.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    }); 
    console.log('Carrito actualizado:', cart);
  };

const handleRemoveFromCart = (productIdToRemove) => {
  setCart (prevCart =>
    prevCart.filter (item => item.id !== productIdToRemove)
  );
};


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout cart={cart} isAuthenticated={isAuthenticated} onLogout={handleLogout} />,
      children: [
        {
          index: true,
          element: <HomePage onAddToCart={handleAddToCart} />,
        },

        {
          path: 'products',
          element: <AllProducts onAddToCart={handleAddToCart} />,
        },

        { 
          path: 'product/:productId',
          element: <ProductDetailPage onAddToCart={handleAddToCart} />,
        },
        {
          path: 'cart',
          element: <CartPage cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />,
        },
        {
          path: 'login',
          element: <LoginPage onLogin={handleLogin} />,
        },
        {
          element: <ProtectedRoute isAllowed={isAuthenticated} />,
          children: [
            {
              path: 'checkout',
              element: <CheckOutPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
 
export default App;
