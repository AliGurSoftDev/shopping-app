import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Eğer react-router kullanıyorsan
import ProductDetails from '../components/Product/ProductDetails.jsx';
import ProductActions from '../components/Product/ProductActions.jsx';
import ProductImageGallery from '../components/Product/ProductImageGallery';
import CartSideBar from '../components/Cart/CartSideBar.jsx';
import MenuBar from '../components/Menu/MenuBar.jsx';

const ProductPage = () => {
  const { id } = useParams(); // URL'den product id alıyoruz, örn: /product/3
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId] = useState(1);
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

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  if (!product) return <p>Ürün bulunamadı</p>;

  return (
    <div className="justify-items-center">
      <MenuBar></MenuBar>
      <CartSideBar userId={userId}></CartSideBar>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2  gap-8">
      <div className="grid grid-rows-2">
              <div className='p-8 text-xl text-center font-sans font-semibold text-violet-500 row-start-1 row-end-4'><h1>{product.name}</h1></div>

        <ProductImageGallery productId={product.id} />

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
