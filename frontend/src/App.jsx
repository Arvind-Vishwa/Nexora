import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./componenets/Navbar.jsx";
import Login from "./componenets/Login.jsx";
import Home from "./componenets/Home.jsx";
import Cart from "./componenets/cart.jsx";
import Payment from "./componenets/Payement.jsx";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/home" element={<Home cart={cart} setCart={setCart} />} />

        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/login" element={<Login />} />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}
