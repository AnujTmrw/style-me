import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListingPage from "./pages/plp";
import ProductDetailsPage from "./pages/pdp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
