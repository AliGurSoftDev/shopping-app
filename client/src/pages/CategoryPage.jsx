import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetails } from "../features/categorySlice";
import { fetchProductsByCategory } from "../features/productSlice";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";
import ProductCard from "../components/Product/ProductCard";
import Breadcrumb from "../components/ui/BreadCrumb";
import Spinner from "../components/ui/Spinner";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const products = useSelector((state) => state.product.products);
  const category = useSelector((state) => state.category.categoryDetails);
  const isLoadingCategory = useSelector((state) => state.category.status) === "loading";
  const isLoadingProducts = useSelector((state) => state.product.status) === "loading";

  useEffect(() => {
    dispatch(fetchCategoryDetails(categoryId));
    dispatch(fetchProductsByCategory(categoryId));
  }, [dispatch, categoryId]);

  return (
    <div>
      <MenuBar />

      <Breadcrumb
        items={[
          { label: "Categories", to: "/categories" },
          { label: category?.name || "Loading..." },
        ]}
      />
      {isLoadingCategory || !category ? (
        <div className="mt-20 items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="max-w-screen-xl m-auto mt-8">
            <h1 className="font-semibold text-violet-800 ml-8">
              {category.name}
            </h1>
          </div>
          {isLoadingProducts ? (
            <div className="mt-20 items-center">
              <Spinner />
            </div>
          ) : (
            <div className="max-w-screen-xl mx-auto mt-12 px-4">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No products found in this category.
                </p>
              )}
            </div>
          )}
        </>
      )}

      <CartSideBar />
    </div>
  );
};

export default CategoryPage;
