import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { Provider } from 'react-redux';
import store from './store/store.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
    </React.StrictMode>
);
