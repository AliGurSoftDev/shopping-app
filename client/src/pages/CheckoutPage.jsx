import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../features/cartSlice.js";
import { createOrder } from "../features/orderSlice.js";
import { fetchDefaultAddress } from "../features/addressSlice.js";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/menu/MenuBar.jsx";
import CheckoutItemCard from "../components/cart/CheckoutItemCard.jsx";
import { toast } from "react-toastify";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = 1;

  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  const defaultAddress = useSelector((state) => state.address.defaultAddress);

  useEffect(() => {
    dispatch(fetchCart(userId));
    dispatch(fetchDefaultAddress(userId));
  }, [dispatch]);

  const handleCheckout = async () => {
    try {
      const resultAction = await dispatch(createOrder({ userId }));

      if (createOrder.fulfilled.match(resultAction)) {
        toast.success("Order created successfully!");
        navigate("/orders");
      } else {
        toast.error(resultAction.payload || "Failed to place order.");
      }
    } catch (err) {
      console.error("Checkout failed", err);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleAddressChange = () => {
    navigate("/address", { state: { prevPage: "checkout" } });
  };

  const animatedTotal = useAnimatedNumber(cart?.totalPrice ?? 0, 500);

  if (loading || !cart) return <p>Loading...</p>;
  return (
    <>
      <MenuBar />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-violet-600">Checkout</h1>

        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-6">
              {cart.items.map((item) => (
                <CheckoutItemCard key={item.productId} item={item} />
              ))}
            </div>

            <p className="text-xl text-end font-semibold mb-4">
              Total: ${animatedTotal.toFixed(2)}
            </p>

            <h1 className=" text-2xl font-semibold mt-8 ">Delivery Address</h1>
            {defaultAddress? (
              <>
                <div className="flex justify-between items-center">
                  <div className="mt-6 mb-6 text-gray-600 w-full">
                    <p className="font-semibold">
                      <span className="text-black">Address:</span>{" "}
                      {defaultAddress.addressName} ({defaultAddress.addressType}
                      )
                    </p>
                    <p>PostCode: {defaultAddress.postCode}</p>
                  </div>
                  <div className="mt-6 mb-6 text-gray-600 w-full">
                    <p className="">{defaultAddress.addressDetails}</p>
                    <p>
                      {defaultAddress.cityName}
                      {" / "}
                      {defaultAddress.countryName.toUpperCase()}
                    </p>
                  </div>
                  <div className="w-1/2">
                    <button
                      className="w-full bg-transparent border-solid border-violet-400 text-violet-600
                hover:bg-violet-400 hover:text-white"
                      onClick={handleAddressChange}
                    >
                      Change Address
                    </button>
                  </div>
                </div>
                <div className="text-right mt-8">
                  <button
                    onClick={handleCheckout}
                    className="bg-violet-600 text-white w-1/4 size-12 px-6 py-2 rounded hover:bg-green-600 hover:border-green-600"
                  >
                    Place Order
                  </button>
                </div>
              </>
            ):(
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  No default address found. Please add an address to proceed.
                </p>
                <button
                  onClick={handleAddressChange}
                  className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-400 hover:border-violet-400"
                >
                  Add Address
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
