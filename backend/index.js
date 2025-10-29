const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


  let products = [
  { 
    id: 1, 
    name: "Laptop", 
    price: 50000,
    img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=60"
  },
  { 
    id: 2, 
    name: "Shoes", 
    price: 1500,
    img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=60"
  },
  { 
    id: 3, 
    name: "Smartphone", 
    price: 12000,
    img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=60"
  },
  { 
    id: 4, 
    name: "Watch", 
    price: 2000,
    img:"https://images.unsplash.com/photo-1515442261605-65987773c4b2?auto=format&fit=crop&w=600&q=60"
  },
];



let cart = [];


app.get("/api/products", (req, res) => {
  res.json(products);
});


app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});


app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push({ ...product, qty });
    res.json({ message: "Added", cart });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// ✅ DELETE Item from Cart
app.delete("/api/cart/:id", (req, res) => {
  const id = Number(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  res.json({ message: "Removed", cart });
});

// ✅ CHECKOUT
app.post("/api/checkout", (req, res) => {
  const timestamp = new Date();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = { items: cart, total, timestamp };

  cart = []; // empty cart after purchase
  res.json({ message: "Payment Success", receipt });
});

app.listen(5000, () => console.log("Server running on 5000"));
