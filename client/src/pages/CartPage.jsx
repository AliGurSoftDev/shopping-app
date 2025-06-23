import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuBar from "../components/menu/MenuBar";
import Spinner from "../components/ui/Spinner";
import CartItemCard from "../components/cart/CartItemCard";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  emptyCart,
} from "../features/cartSlice";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
import { useNavigate } from "react-router-dom";
import { useDelayedSpinner } from "../hooks/useDelayedSpinner";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const isLoading = useSelector((state) => state.cart.status) === "loading";
  const showSpinner = useDelayedSpinner(isLoading, 200);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId, quantity) => {
    dispatch(removeFromCart({ productId, quantity }));
  };

  const handleIncrease = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleDecrease = (productId) => {
    dispatch(removeFromCart({ productId, quantity: 1 }));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const animatedTotal = useAnimatedNumber(cart?.totalPrice ?? 0, 500);

  return (
    <div>
      <MenuBar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="mt-4 text-2xl font-bold mb-6 text-violet-700">
          Your Shopping Cart
        </h1>
        {showSpinner || !cart ? (
          <div className="mt-20 items-center">
            <Spinner />
          </div>
        ) : (
          <>
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
                    onClick={handleCheckout}
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
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
