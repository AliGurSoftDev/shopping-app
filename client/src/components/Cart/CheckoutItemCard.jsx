import React from "react";

const CheckoutItemCard = ({ item }) => {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      {/* Image */}
      <img
        src={item.imageUrl || "/images/placeholder.jpg"}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded-xl"
      />

      {/* Product Info */}
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-lg font-medium truncate">{item.productName}</h3>
        <p className="text-sm text-gray-500">
          Unit Price: ${item.unitPrice.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <div>
        <p>{item.quantity} x ${item.unitPrice}</p>
      </div>

      {/* Total Price */}
      <div className="text-right w-28">
        <p className="text-violet-600 font-semibold">
          ${(item.unitPrice * item.quantity).toFixed(2)}
        </p>
        <p className="text-xs text-gray-400">Total</p>
      </div>
    </div>
  );
};

export default CheckoutItemCard;
