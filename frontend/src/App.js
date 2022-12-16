import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Members from "./components/Members";
import Cart from "./components/Cart";
import Detail from "./components/Products/detail";
import AddProduct from "./components/AddProduct";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <BrowserRouter>
        <Header />

        <Routes>
          <Route index path="/" element={<Products />} />
          <Route path="/members" element={<Members />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/:productId" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
