import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  emptyWishlist,
} from "../features/wishlistSlice";
import { addToCart } from "../features/cartSlice";
import WishlistItemCard from "../components/wishlist/WishlistItemCard";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";
import Spinner from "../components/ui/Spinner";
import { useDelayedSpinner } from "../hooks/useDelayedSpinner";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const isLoading = useSelector((state) => state.wishlist.status) === "loading";
  const showSpinner = useDelayedSpinner(isLoading, 200);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 })).then(() =>
      dispatch(removeFromWishlist({ productId }))
    );
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist({ productId }));
  };

  const handleAddAllToCart = () => {
    if (!wishlist?.items) return;
    wishlist.items.forEach((item) => {
      dispatch(addToCart({ productId: item.productId, quantity: 1 }));
    });
    handleEmptyWishlist();
  };

  const handleEmptyWishlist = () => {
    dispatch(emptyWishlist());
  };

  return (
    <>{console.log("Rendering WishlistPage")}
      <MenuBar />
      <CartSideBar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="mt-4 text-2xl font-bold mb-6 text-violet-700">
          Your Wishlist
        </h1>
        {showSpinner || !wishlist ? (
          <div className="mt-20 items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {wishlist && wishlist.items.length > 0 ? (
              <>
                {wishlist.items.map((item) => {
                  if (!item) return null;

                  const cardData = {
                    productId: item.productId,
                    productName: item.productName,
                    unitPrice: item.unitPrice,
                    imageUrl: item.imageUrl,
                  };

                  return (
                    <WishlistItemCard
                      key={item.productId}
                      item={cardData}
                      onAddToCart={handleAddToCart}
                      onRemove={handleRemove}
                    />
                  );
                })}

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <p className="text-lg font-semibold">
                    Total Wishlist Value:{" "}
                    <span className="text-violet-600">
                      ${wishlist.totalPrice.toFixed(2)}
                    </span>
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={handleAddAllToCart}
                      className="bg-violet-600 text-white  hover:bg-green-500 hover:border-green-500  active:bg-violet-300 transition-colors duration-100 focus:!outline-none px-4 py-2 rounded"
                    >
                      Add All to Cart
                    </button>

                    <button
                      onClick={handleEmptyWishlist}
                      className="bg-transparent text-violet-700 border-violet-500 hover:bg-red-500 hover:text-white hover:border-red-500 active:bg-red-200 transition-colors duration-100 focus:!outline-none px-4 py-2 rounded"
                    >
                      Empty Wishlist
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-600 font-semibold">
                Your wishlist is empty.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
