import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/Header";
import Products from "./components/Products";
import Members from "./components/Members";
import Cart from "./components/Cart";
import Detail from "./components/Products/detail";

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
          <Route path="/product/:productId" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
