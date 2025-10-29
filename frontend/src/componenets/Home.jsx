import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

export default function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")   
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  
  const addToCart = async (item) => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        productId: item.id,
        qty: 1
      });

      
      setCart([...cart, { ...item, qty: 1 }]);

      alert("Added to cart!");
    } catch (err) {
      console.log("Add to cart failed", err);
    }
  };

  return (
    <div className="home-container">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} />

            <h3>{p.name}</h3>
            <p className="product-price">₹{p.price}</p>

            
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
