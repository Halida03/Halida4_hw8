import React from 'react';
import { FaHeart } from 'react-icons/fa';

const List = ({ handleLikeClick, products, likedProduct, removeProduct }) => {
  console.log(products);
  return (
    <div>
      <ul className="products">
        {products.map((product) => (
          <li key={product.id} id="li">
            <img src={product.image} alt={product.name} className="img" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <FaHeart
              className="icon-heart"
              style={{ color: Array.isArray(likedProduct) && likedProduct.includes(product.id) ? 'red' : 'inherit' }}
              onClick={() => {
                handleLikeClick(product.id);
                if (removeProduct) {
                  removeProduct(product.id);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;