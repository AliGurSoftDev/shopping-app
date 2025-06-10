import React, { useState } from 'react';

const ProductImageGallery = ({ imageUrls = [], imageSize = 96 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className={`relative h-${imageSize} w-${imageSize} flex items-center justify-center bg-gray-200 rounded-2xl`}>
        <img
          src={`/images/placeholder.jpg`}
          alt="No image"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    );
  }

  // Ensure images are sorted by displayOrder
  const sortedImages = [...imageUrls].sort((a, b) => a.displayOrder - b.displayOrder);

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1));
      setFade(false);
    }, 300);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1));
      setFade(false);
    }, 300);
  };

  return (
    <div className={`relative h-${imageSize} w-${imageSize}`}>
      <img
        src={sortedImages[currentIndex].imageUrl}
        alt={`Product Image ${currentIndex + 1}`}
        className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Navigation Arrows */}
      {sortedImages.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 focus:outline-none bg-white opacity-60 hover:opacity-85 border-none p-2 rounded-xl shadow-md"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 focus:outline-none bg-white opacity-60 hover:opacity-85 border-none p-2 rounded-xl shadow-md"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
};

export default ProductImageGallery;
