import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { addToWishlist } from '../../features/wishlistSlice';

const ProductActions = ({ productId, stock, userId }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ userId, productId, quantity }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ userId, productId, quantity }));
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center space-x-2">
        <button onClick={handleDecrease} className="bg-gray-200 px-2 py-1 rounded-md">-</button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button onClick={handleIncrease} className="bg-gray-200 px-2 py-1 rounded-md">+</button>
      </div>
      <div className="flex space-x-2 mt-4">
        <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white rounded-lg focus:!outline-none active:bg-blue-300 transition-colors duration-100">
          Add {quantity} to Cart
        </button>
        <button onClick={handleAddToWishlist} className="px-4 py-2 bg-gray-300 text-black rounded-lg">
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
