import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedProducts, fetchFeaturedProducts } from "../features/productSlice";
import ProductCard from "../components/product/ProductCard";
import { useParams } from "react-router-dom";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const userId = 1;
  var [isSuccessful, setIsSuccessful] = useState(true);
  const searchedProducts = useSelector(
    (state) => state.product.searchedProducts
  );
  const featuredProducts = useSelector(
    (state) => state.product.featuredProducts
  );
  const loading = useSelector((state) => state.product.loading);

  useEffect(() => {
    if (keyword) {
      dispatch(fetchSearchedProducts(keyword)).then((action) => {
        if (action.payload.length === 0) {
          dispatch(fetchFeaturedProducts());
          setIsSuccessful(false);
        }
        else{
          setIsSuccessful(true);}
      });
    }
  }, [keyword, dispatch]);

  const productsToShow =
    searchedProducts?.length > 0 ? searchedProducts : featuredProducts;

  return (
    <>
      <MenuBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-violet-600 text-center mb-6">
          {isSuccessful ? "Search Results for " : "No Results for "}"{keyword}"
        </h1>

        {loading ? (
          <p className="text-center">Yükleniyor...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {productsToShow?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <CartSideBar userId={userId}/>
    </>
  );
};

export default SearchResultsPage;
