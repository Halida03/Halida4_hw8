import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Modal = ({ selectedProducts, handleLikeClick, setLikedProduct }) => {
  return (
    <div className='modal'>
      <h2>Selected Products</h2>
      <ul className='products'>
        {selectedProducts && selectedProducts.map((product) => (
          <li key={`modal-${product?.id}`}>
            {product && (
              <div>
                <img src={product.image} alt={product.title} className='img' />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <FaHeart
                  className="icon-heart"
                  style={{ color: 'red' }}
                  onClick={() => {
                    handleLikeClick(product.id);
                    if (setLikedProduct) {
                      setLikedProduct(prevLikedProducts => prevLikedProducts.filter(id => id !== product.id));
                    }
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
