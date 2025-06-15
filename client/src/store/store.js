import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import wishlistReducer from '../features/wishlistSlice';
import addressReducer from '../features/addressSlice';
import orderReducer from '../features/orderSlice';
import productReducer from '../features/productSlice';
import categoryReducer from '../features/categorySlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    order: orderReducer,
    product: productReducer,
    category: categoryReducer,
    auth: authReducer,
  },
});

export default store;
