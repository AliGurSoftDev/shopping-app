import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const placeholderImage = "/images/placeholder.jpg";

  // Get first image by displayOrder or fallback
  const sortedImages = [...product.imageUrls]?.sort((a, b) => a.displayOrder - b.displayOrder);
  const imageUrl = sortedImages?.[0]?.imageUrl || placeholderImage;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 bg-white">
      <Link to={`/product/${product.id}`} className="block w-full text-center mt-3">
        <div className="p-4 flex flex-col items-center">
          <div className="w-56 h-56">
            <img
              src={imageUrl}
              alt={`Product ${product.name}`}
              className="w-full h-full object-cover rounded-2xl transition-opacity duration-300"
              onError={(e) => {
                e.currentTarget.src = placeholderImage;
              }}
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <p className="text-gray-500 font-semibold text-lg">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
