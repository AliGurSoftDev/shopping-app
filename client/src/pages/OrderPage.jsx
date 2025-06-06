import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, cancelOrder } from "../features/orderSlice";
import { fetchAllAddresses } from "../features/addressSlice";
import MenuBar from "../components/menu/MenuBar";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const userId = 1; // Replace with real user ID
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  const allAddresses = useSelector((state => state.address.allAddresses));
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
  
  const filteredOrders = orders.filter(
    (order) => !statusFilter || order.status === statusFilter
  );

  const handleCancel = async (orderId) => {
    try {
      await dispatch(cancelOrder({ userId, orderId })).unwrap();
      toast.info("Order cancelled.")
    } catch (errorMessage) {
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <MenuBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && orders.length === 0 && <p>You have no orders yet.</p>}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Canceled</option>
          <option value="Failed">Failed</option>
        </select>

        <ul className="space-y-4">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="border rounded-md p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Address: {allAddresses.find((a) => a.id === order.addressId)?.addressName}
                  </p>
                  <p className="text-sm text-gray-700">
                    Items: {order.items.length} • Total: $
                    {order.totalAmount.toFixed(2)}
                  </p>
                </div>

                <span
                  className={`text-lg font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded ${
                    (order.status === "Cancelled" || order.status === "Failed") ?
                    "text-red-800 bg-red-100" : (order.status === "Delivered") ?
                    "text-green-800 bg-green-100" : "text-blue-800 bg-blue-100"
                  }`}
                >
                  {order.status}
                </span>
                <div className="text-right space-y-2">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="text-red-600 w-full underline text-sm block hover:border-red-700"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="text-blue-600 underline text-sm block"
                    onClick={() => toggleExpand(order.id)}
                  >
                    {expandedOrderIds.includes(order.id)
                      ? "Hide Items"
                      : "View Items"}
                  </button>
                </div>
              </div>

              {expandedOrderIds.includes(order.id) && (
                <div className="mt-4 border-t pt-2">
                  {order.items.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No items</p>
                  ) : (
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm text-gray-800">
                          {item.productName} × {item.quantity} — $
                          {item.unitPrice.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OrdersPage;
