import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetails } from "../features/categorySlice";
import { fetchProductById } from "../features/productSlice";
import { useParams } from 'react-router-dom'; // Eğer react-router kullanıyorsan
import ProductDetails from '../components/product/ProductDetails.jsx';
import ProductActions from '../components/product/ProductActions.jsx';
import ProductImageGallery from '../components/product/ProductImageGallery.jsx';
import CartSideBar from '../components/cart/CartSideBar.jsx';
import MenuBar from '../components/menu/MenuBar.jsx';
import Breadcrumb from '../components/ui/BreadCrumb.jsx';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.product.selectedProduct);
  const category = useSelector((state) => state.category.categoryDetails);
  const userId = 1;

  useEffect(() => {
  dispatch(fetchProductById(productId));
  product && dispatch(fetchCategoryDetails(product.categoryId));
  }, [dispatch, productId, product]);

  if (!product) return <p>Ürün bulunamadı</p>;

  return (
    <div className="justify-items-center">
      <MenuBar></MenuBar>
      <Breadcrumb 
      items={[
          { label: "Categories", to: "/categories" },
          { label: category?.name || "Loading...", to: `/category/${product.categoryId}` },
          { label: product?.name || "Loading..."}
        ]}
      />
      <CartSideBar userId={userId}></CartSideBar>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2  gap-8">
      <div className="grid grid-rows-2">
              <div className='p-8 text-xl text-center font-sans font-semibold text-violet-500 row-start-1 row-end-4'><h1>{product.name}</h1></div>

        <div className='h-96 w-96'><ProductImageGallery imageUrls={product.imageUrls} /></div>

        </div>

        <div className=' items-center content-center'>
          <ProductDetails 
            title={product.name} 
            description={product.description} 
            price={product.price} 
            stock={product.stock}
          />
          <ProductActions productId={product.id} stock={product.stock} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
