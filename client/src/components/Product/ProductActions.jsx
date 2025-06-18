import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { addToWishlist } from "../../features/wishlistSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductActions = ({ productId, stock, userId }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ userId, productId, quantity }));
    toast.info("Item added to cart.");
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist({ userId, productId, quantity }));
    toast.info("Item added to wishlist.");
  };


  const handleAddAndCheckout = () => {
    handleAddToCart();
     navigate("/checkout");
  };

  return (
    <div className="p-2 space-y-2 w-11/12">
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrease}
          className="bg-gray-200 px-2 py-1 rounded-md"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-gray-200 px-2 py-1 rounded-md"
        >
          +
        </button>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleAddToCart}
          className="px-4 w-1/2 py-2 bg-blue-600 text-white rounded-lg focus:!outline-none 
          active:bg-blue-300 transition-colors duration-100
          hover:bg-blue-500 hover:border-blue-500"
        >
          Add {quantity} to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="px-4 w-1/2 py-2 bg-gray-300 text-blackrounded-lg 
          focus:!outline-none 
          active:bg-gray-50 transition-colors duration-100
          hover:bg-gray-400 hover:text-white hover:border-gray-400"
        >
          Add to Wishlist
        </button>
      </div>
      <div>
        <button className="w-full bg-transparent text-green-600 border-green-600 
        hover:text-white hover:bg-green-600 hover:border-green-600
         focus:!outline-none
         active:bg-green-300 transition-colors duration-100"
         onClick={handleAddAndCheckout}>
          Add {quantity} & Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
