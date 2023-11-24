import React, { createContext, useContext } from 'react';
import List from './components/list';
import Modal from './components/modal';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const ContentContext = createContext();

export const useContentContext = () => {
  return useContext(ContentContext);
};

const Content = ({ products, likedProduct, setLikedProduct, selectedProducts, setSelectedProducts }) => {
  const addFavorite = async (product) => {
    try {
      const docRef = doc(db, 'favorites', product.id.toString());
      await setDoc(docRef, { ...product });
      console.log(`${product.title} добавлен в избранное`);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  };

  const removeFavoriteAndFirestore = async (productId) => {
    try {
      const docRef = doc(db, 'favorites', productId.toString());
      await deleteDoc(docRef);
      console.log(`Товар с ID ${productId} удален из избранного и Firestore`);
    } catch (error) {
      console.error('Ошибка при удалении из избранного и Firestore:', error.message);
    }
  };

  const handleLikeClick = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    const isLiked = likedProduct && likedProduct.includes(productId);

    if (isLiked) {
      const updatedLikedProducts = likedProduct.filter((id) => id !== productId);
      setLikedProduct(updatedLikedProducts);

      const updatedSelectedProducts = selectedProducts.filter((product) => product.id !== productId);
      setSelectedProducts(updatedSelectedProducts);
      removeFavoriteAndFirestore(productId);
    } else {
      setLikedProduct([...(likedProduct || []), productId]);
      setSelectedProducts([...selectedProducts, selectedProduct]);
      addFavorite(selectedProduct);
    }
  };

  return (
    <ContentContext.Provider value={{ handleLikeClick }}>
      <div>
        <h2>Content</h2>
        <List
          handleLikeClick={handleLikeClick}
          products={products}
          likedProduct={likedProduct}
          setLikedProduct={setLikedProduct}
        />
        <Modal selectedProducts={selectedProducts} />
      </div>
    </ContentContext.Provider>
  );
};

export default Content;
