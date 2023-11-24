import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { TbDeviceTabletHeart } from 'react-icons/tb';
import Modal from './components/modal';
import AuthContainer from './AuthContainer';
import Content from './Content';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [likedProduct, setLikedProduct] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching Products:', error);
      }
    };
    fetchData();
  }, []);

  const removeSelectedProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId));
  };

  const handleLikeClick = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);

    if (likedProduct.includes(productId)) {
      setLikedProduct(likedProduct.filter((id) => id !== productId));
      removeSelectedProduct(productId);
    } else {
      setLikedProduct([...likedProduct, productId]);
      setSelectedProducts([...selectedProducts, selectedProduct]);
    }
  };


  const handleSignIn = () => {
    setUserLoggedIn(true);
  };
  

  return (
    <div className='App'>
      {userLoggedIn ? (
        <>
          <Routes>
            <Route
              path="/"
              element={<Content 
                products={products} 
                handleLikeClick={handleLikeClick} 
                likedProduct={likedProduct} 
                setLikedProduct={setLikedProduct}
                setSelectedProducts={setSelectedProducts}
                selectedProducts={selectedProducts}/>}
            />
            <Route
              path="/modal"
              element={<Modal 
                selectedProducts={selectedProducts} 
                handleLikeClick={handleLikeClick}
                setLikedProduct={setLikedProduct}/>}
            />
          </Routes>
          <Link to="/modal">
            <TbDeviceTabletHeart className='Liked' />
          </Link>
        </>
      ) : (
        <AuthContainer onSignIn={handleSignIn} />
      )}
    </div>
  );
}

export default App;