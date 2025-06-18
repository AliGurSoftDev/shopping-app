import React from "react";

const OrderCard = ({
  order,
  isExpanded,
  toggleExpand,
  onCancel,
  addressName,
  addressType,
  address,
}) => {
  return (
    <li className="border rounded-md p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <p className="font-semibold text-lg">Order #{order.id}</p>
          <p className="text-sm text-gray-500">
            Date: {new Date(order.orderDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Address:{" "}
            {addressName && addressType
              ? addressName + " (" + addressType + ")"
              : "N/A"}
          </p>
          <p className="text-sm text-gray-700">
            Items: {order.items.length} • Total: ${order.totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="1/3">
          <span
            className={`text-lg font-medium px-2 py-1 rounded ${
              order.status === "Cancelled" || order.status === "Failed"
                ? "text-red-800 bg-red-100"
                : order.status === "Delivered"
                ? "text-green-800 bg-green-100"
                : "text-blue-800 bg-blue-100"
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="w-1/3 justify-items-end space-y-2">
          {order.status === "Pending" && (
            <button
              onClick={() => onCancel(order.id)}
              className="text-red-600 bg-transparent w-3/5 underline text-sm block hover:border-red-700  focus:outline-none"
            >
              Cancel
            </button>
          )}
          <button
            className="bg-transparent text-blue-600 underline w-3/5 text-sm block focus:outline-none"
            onClick={() => toggleExpand(order.id)}
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 border-t pt-2">
          {order.items.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No items</p>
          ) : (
            <ul className="space-y-2 text-sm  text-gray-800 grid grid-cols-[2fr,1fr] gap-4">
              <div>
                <p className="font-semibold">Items</p>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productName} × {item.quantity} — $
                    {item.unitPrice.toFixed(2)}
                  </li>
                ))}
                No Longer Human - Osamu Dazai × 1 — $15.45No Longer Human - Osamu Dazai × 1 — $15.45No Longer Human - Osamu Dazai × 1 — $15.45
              </div>
              <div className="text-right">
                <p className="font-semibold">Address</p>
                <p> {address.addressDetails}</p>
                <p>
                  {address.cityName} / {address.countryName}
                </p>
              </div>
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};

export default OrderCard;
