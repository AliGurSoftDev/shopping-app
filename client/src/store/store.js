import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import wishlistReducer from '../features/wishlistSlice';
import addressReducer from '../features/addressSlice';
import orderReducer from '../features/orderSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    order: orderReducer
  },
});

export default store;
