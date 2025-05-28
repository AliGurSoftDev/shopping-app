import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CategoryCard = ({ category }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const img = new Image();
    const testUrl = `/images/categories/${category.id}.jpg`;

    img.src = testUrl;
    img.onload = () => setImageUrl(testUrl);
    img.onerror = () => setImageUrl("/images/categories/placeholder.jpg");
  }, [category.id]);  
  
  return (
    <Link to={`/category/${category.id}`} className="block text-violet-600 hover:text-violet-700">
      <div
        className="h-48 w-full rounded-lg shadow-md overflow-hidden bg-cover bg-center relative transition"
        style={{ backgroundImage: `url(${imageUrl || '/images/categories/placeholder.jpg'})` }}
      >
        {/* Dark overlay for text readability */}
        <h2 className="text-2xl font-bold flex justify-left items-center ml-6 mt-12 p-2">
          {category.name}
        </h2>
        <p className="text-sm ml-8">{category.description}</p>
        <div className="absolute inset-0 bg-violet-100 bg-opacity-30 hover:bg-opacity-15"></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
