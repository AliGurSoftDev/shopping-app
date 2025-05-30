import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  emptyWishlist,
} from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import WishlistItemCard from "../components/wishlist/WishlistItemCard";
import MenuBar from "../components/menu/MenuBar";
import CartSideBar from "../components/cart/CartSideBar";

const WishlistPage = ({ userId = 1 }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist(userId));
  }, [dispatch, userId]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ userId, productId, quantity: 1 }))
      .then(() => dispatch(removeFromWishlist({ userId, productId })))
      .then(() => dispatch(fetchWishlist(userId)));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist({ userId, productId }))
      .then(() => dispatch(fetchWishlist(userId)));
  };

  const handleAddAllToCart = () => {
    if (!wishlist?.items) return;
    wishlist.items.forEach((item) => {
      dispatch(addToCart({ userId, productId: item.productId, quantity: 1 }));
    });
    dispatch(emptyWishlist(userId)).then(() => dispatch(fetchWishlist(userId)));
  };

  const handleEmptyWishlist = () => {
    dispatch(emptyWishlist(userId));
  };

  return (
    <>
      <MenuBar />
      <CartSideBar userId={userId} />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="mt-4 text-2xl font-bold mb-6 text-violet-700">
          Your Wishlist
        </h1>

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
                  className=" text-violet-700 border-violet-500 hover:bg-red-500 hover:text-white hover:border-red-500 active:bg-red-200 transition-colors duration-100 focus:!outline-none px-4 py-2 rounded"
                >
                  Empty Wishlist
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 font-semibold">Your wishlist is empty.</p>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
