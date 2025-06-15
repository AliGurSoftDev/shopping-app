import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, cancelOrder } from "../features/orderSlice";
import { fetchAllAddresses } from "../features/addressSlice";
import MenuBar from "../components/menu/MenuBar";
import OrderCard from "../components/order/OrderCard";
import { toast } from "react-toastify";
import CartSideBar from "../components/cart/CartSideBar";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const userId = 1; // Replace with real user ID
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  const allAddresses = useSelector((state) => state.address.allAddresses);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchOrders(userId));
    dispatch(fetchAllAddresses(userId));
  }, [dispatch]);

  const toggleExpand = (orderId) => {
    setExpandedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const filteredOrders = orders
    .filter((order) => !statusFilter || order.status === statusFilter)
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  const handleCancel = async (orderId) => {
    try {
      await dispatch(cancelOrder({ userId, orderId })).unwrap();
      toast.info("Order cancelled.");
    } catch (errorMessage) {
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <MenuBar />
      <CartSideBar userId={userId} />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="mt-4 text-2xl font-bold text-violet-700">Your Orders</h1>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && orders.length === 0 && <p>You have no orders yet.</p>}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="font-semibold text-gray-700 w-2/5 mb-4 rounded-lg shadow-md border border-blue-300 p-2 transition-all duration-300 hover:shadow-lg focus-visible:border-transparent focus:!ring-transparent ml-auto block text-right"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Canceled</option>
          <option value="Failed">Failed</option>
        </select>

        {filteredOrders && allAddresses && (
          <ul className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrderIds.includes(order.id)}
                  toggleExpand={toggleExpand}
                  onCancel={handleCancel}
                  addressName={
                    allAddresses.find((a) => a.id === order.addressId)
                      ?.addressName
                  }
                  addressType={
                    allAddresses.find((a) => a.id === order.addressId)
                      ?.addressType
                  }
                />
              ))
            ) : (
              <p className="text-gray-600 text-lg font-bold text-center mt-8">
                No orders to display.
              </p>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
