import React, { useState, useEffect } from "react";

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  const [imageUrl, setImageUrl] = useState("/images/placeholder.jpg");

  useEffect(() => {
    const testUrl = `/images/products/${item.productId}/1.jpg`;
    const img = new Image();
    img.src = testUrl;

    img.onload = () => setImageUrl(testUrl);
  }, [item.productId]);

  return (
    <div className="flex items-center justify-between gap-4 border-b py-4">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-2xl"
      />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold truncate">{item.productName}</h3>
        <p className="text-sm text-gray-500">Unit Price: ${item.unitPrice.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.productId)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.productId)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="w-24 text-right">
        <p className="text-violet-600 font-bold">
          ${(item.unitPrice * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.productId, item.quantity)}
        className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        X
      </button>
    </div>
  );
};

export default CartItemCard;
