import React from 'react';

const ProductDetails = ({ title, description, price, stock }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-700">{description}</p>
      <p className="text-xl font-semibold">${price}</p>
      <p className="text-gray-700">Stock: {stock}</p>
    </div>
  );
};

export default ProductDetails;