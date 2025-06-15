import "./MenuBar.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // if using React Router

const MenuBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // You could also use a function prop here to call search logic
      navigate(`/products/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/homepage"}>
          <div className="text-2xl font-bold text-violet-700">MyShop</div>
        </Link>

        {/* Search bar */}
        <div className="hidden md:flex flex-grow max-w-md mx-8">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400
                 bg-violet-50 text-violet-800 font-semibold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleSearch}
            className="bg-transparent text-violet-500 px-4 py-2 rounded-2xl ml-2  border-violet-500 hover:bg-violet-700 hover:text-white"
          >
            Search
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a className="menu-link" href="/homepage">
            Main Page
          </a>
          <a className="menu-link" href="/products">
            Products
          </a>
          <a className="menu-link" href="/categories">
            Categories
          </a>
          <a className="menu-link" href="/orders">
            Orders
          </a>
          <a className="menu-link" href="/cart">
            Cart
          </a>
          <a className="menu-link" href="/wishlist">
            Wishlist
          </a>
          <a className="menu-link" href="/checkout">
            Checkout
          </a>
          <a className="menu-link" href="/account">
            Account
          </a>
        </nav>
      </div>
    </header>
  );
};

export default MenuBar;
