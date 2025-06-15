import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // if using React Router
import { fetchCart, emptyCart } from "../../features/cartSlice";
import { useAnimatedNumber } from "../../hooks/useAnimatedNumber";

const CartSideBar = ({ userId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const status = useSelector((state) => state.cart.status);
  const animatedTotal = useAnimatedNumber(cart?.totalPrice ?? 0, 700);

  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart(userId)).then(() => dispatch(fetchCart(userId)));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-16 right-0 h-full transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[90%]"
      }`}
    >
      <div
        className={`relative h-full shadow-lg p-4 w-96 ${
          isOpen ? "bg-violet-100" : "bg-violet-300"
        }`}
      >
        <button
          onClick={toggleCart}
          className={`hover:!border-transparent focus:outline-none
            absolute top-1/2 transform -translate-y-1/2 -left-8 p-8 
            ${
              isOpen
                ? "bg-violet-100  text-gray-600"
                : "bg-violet-300 text-white"
            } rounded-full 
            transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          ◀
        </button>

        <div
          className={`transform -rotate-90 -translate-x-1/2 ${
            isOpen ? "invisible" : "visible"
          } bg-gradient-to-l from-violet-600 to-violet-300 pb-4 ml-1.5`}
        >
          {status === "loading" ? (
            <span className="text-xl text-white">Loading...</span>
          ) : cart ? (
            <>
              <span className="text-xl text-white">Cart Total: </span>
              <span className="text-xl font-semibold text-white">
                ${animatedTotal.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl text-gray-500">Cart is empty</span>
          )}
        </div>

        <div className="pl-8">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cart && cart.items.length > 0 ? (
            <div>
              {cart.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-300 transition-transform duration-100"
                >
                  <span>
                    {item.productName} x {item.quantity}
                  </span>
                  <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-gray-500">Your cart is empty.</div>
          )}
          <div className="mt-4 font-bold">
            Total: ${animatedTotal.toFixed(2)}
          </div>
        </div>

        <div className="pl-8 mt-6 text-center">
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
      </div>
    </div>
  );
};

export default CartSideBar;
