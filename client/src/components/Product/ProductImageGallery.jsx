import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImageGallery = ({ productId }) => {
  const [imageCount, setImageCount] = useState(0);
  const [currentImage, setCurrentImage] = useState(1);
  const [fade, setFade] = useState(false);

  // Arrow click handlers
  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
    setCurrentImage((prev) => (prev === 1 ? imageCount : prev - 1));
    setFade(false);
    }, 300);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
    setCurrentImage((prev) => (prev === imageCount ? 1 : prev + 1));
    setFade(false);
    }, 300);
  };

  // Fetch image count dynamically
  useEffect(() => {
    const fetchImageCount = async () => {
      let count = 0;
      const maxAttempts = 50; // To prevent infinite loop

      for (let i = 1; i <= maxAttempts; i++) {
        try {
          const response = await fetch(`/images/products/${productId}/${i}.jpg`, { method: 'HEAD' });
          if (response.ok) {
            // Check if the response is a valid image by loading it temporarily
            const img = new Image();
            img.src = `/images/products/${productId}/${i}.jpg`;
            await new Promise((resolve) => {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
            });

            if (img.complete && img.naturalWidth > 0) {
              count++;
            } else {
              break;
            }
          } else {
            break;
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          break;
        }
      }

      setImageCount(count);
    };

    fetchImageCount();
  }, [productId]);

  return (
    <div className="relative w-96 h-96">
      {imageCount ? (
        <>
          <img
            src={`/images/products/${productId}/${currentImage}.jpg`}
            alt={`Product ${productId} - Image ${currentImage}`}
            className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 focus:outline-none bg-white opacity-60 hover:opacity-85 !border-transparent p-2 rounded-xl shadow-md"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 focus:outline-none bg-white opacity-60 hover:opacity-85 !border-transparent p-2 rounded-xl shadow-md"
          >
            ▶
          </button>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl">
          {imageCount === 0 ? "No Images Available" : "Loading..."}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
