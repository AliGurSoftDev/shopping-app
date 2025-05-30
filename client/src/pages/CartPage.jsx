import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../components/menu/MenuBar";
import CartItemCard from "../components/cart/CartItemCard";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  emptyCart,
} from "../features/cart/cartSlice";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

const CartPage = () => {
  const userId = 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const handleRemove = (productId, quantity) => {
    dispatch(removeFromCart({ userId, productId, quantity })).then(() =>
      dispatch(fetchCart(userId))
    );
  };

  const handleIncrease = (productId) => {
    dispatch(addToCart({ userId, productId, quantity: 1 })).then(() =>
      dispatch(fetchCart(userId))
    );
  };

  const handleDecrease = (productId) => {
    dispatch(removeFromCart({ userId, productId, quantity: 1 })).then(() =>
      dispatch(fetchCart(userId))
    );
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart(userId)).then(() => dispatch(fetchCart(userId)));
  };
  const animatedTotal = useAnimatedNumber(cart?.totalPrice ?? 0, 500);

  return (
    <div>
      <MenuBar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6 text-violet-700">
          Your Shopping Cart
        </h1>

        {cart && cart.items.length > 0 ? (
          <>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItemCard
                  key={item.productId}
                  item={item}
                  onRemove={handleRemove}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              ))}
            </div>
            <div className="mt-8 text-right">
              <p className="text-xl font-semibold text-gray-700">
                Total:{" "}
                <span className="text-violet-600">
                  ${animatedTotal.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="w-1/3 justify-self-end mt-4">
              <button
                className="w-full bg-violet-500 hover:bg-green-500 active:bg-violet-300 transition-colors duration-100 focus:!outline-none
                    text-white font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
              >
                Checkout
              </button>
              <button
                className="mt-4 w-full bg-transparent active:bg-violet-300 transition-colors duration-100 focus:!outline-none
                    hover:bg-red-500 text-violet-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
                onClick={handleEmptyCart}
              >
                Empty Cart
              </button>
            </div>
          </>
        ) : (
          <p className="font-semibold text-lg text-gray-600">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
