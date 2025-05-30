import React, { useState, useEffect } from "react";

const WishlistItemCard = ({ item, onAddToCart, onRemove }) => {
  const [imageUrl, setImageUrl] = useState("/images/placeholder.jpg");

  useEffect(() => {
    const testUrl = `/images/products/${item.productId}/1.jpg`;
    const img = new Image();
    img.src = testUrl;
    img.onload = () => setImageUrl(testUrl);
  }, [item.productId]);

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img
        src={imageUrl}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-2xl"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.productName}</h3>
        <p className="text-violet-600 font-bold">
          ${item.unitPrice.toFixed(2)}
        </p>
      </div>

      <button
        className="ml-4 bg-violet-500 text-white px-3 py-1 rounded hover:bg-green-500 hover:border-green-500 active:bg-violet-300 transition-colors duration-100 focus:!outline-none"
        onClick={() => onAddToCart(item.productId, 1)}
      >
        Add to Cart
      </button>

      <button
        className="ml-2 bg-transparent text-violet-700 border-violet-500 hover:bg-red-500 hover:text-white hover:border-red-500 active:bg-red-200 transition-colors duration-100 focus:!outline-none px-3 py-1 rounded"
        onClick={() => onRemove(item.productId)}
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistItemCard;
