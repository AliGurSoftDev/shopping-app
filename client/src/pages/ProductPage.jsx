import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Eğer react-router kullanıyorsan
import ProductDetails from '../components/product/ProductDetails.jsx';
import ProductActions from '../components/product/ProductActions.jsx';
import ProductImageGallery from '../components/product/ProductImageGallery.jsx';
import CartSideBar from '../components/cart/CartSideBar.jsx';
import MenuBar from '../components/menu/MenuBar.jsx';
import Breadcrumb from '../components/ui/BreadCrumb.jsx';

const ProductPage = () => {
  const { id } = useParams(); // URL'den product id alıyoruz, örn: /product/3
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId] = useState(1);
  const [category, setCategory] = useState(null);
  useEffect(() => {
    // API'den veri çek
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5078/api/product/${id}`);
        if (!response.ok) {
          throw new Error('Ürün bulunamadı');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
  if (!product) return;

  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:5078/api/category/${product.categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setCategory(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  fetchCategory();
}, [product]); // sadece product değiştiğinde çalışır


  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
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
