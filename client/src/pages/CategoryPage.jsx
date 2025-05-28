import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuBar from "../components/Menu/MenuBar";
import CartSideBar from "../components/Cart/CartSideBar";
import ProductCard from "../components/Product/ProductCard";
import Breadcrumb from "../components/ui/BreadCrumb";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const userId = 1; // Replace with dynamic user ID if needed

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5078/api/category/${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        } else {
          console.error("Failed to fetch category details.");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5078/api/product/category=${categoryId}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategoryDetails();
    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <MenuBar />

      <Breadcrumb
        items={[
          { label: "Categories", to: "/categories" },
          { label: category?.name || "Loading..." }
        ]}
      />

      <CartSideBar userId={userId} />
      <div className="max-w-screen-xl m-auto mt-8">
        <h1 className="font-semibold text-violet-800 ml-8">{category?.name}</h1>
      </div>
      <div className="max-w-screen-xl mx-auto mt-12 px-4">
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
