import "./Cart.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Cart({ cart, setCart }) {

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => console.log("Error loading cart", err));
  }, []);

  
  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCart(cart.filter((item) => item.id !== id));
    } catch (err) {
      console.log("Error deleting item", err);
    }
  };

  
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Cart is empty ❗</h3>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.img} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price} × {item.qty || 1}</p>

                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <h2>Total: ₹{total}</h2>

          <Link to="/payment">
            <button className="checkout-btn">Proceed to Payment</button>
          </Link>
        </>
      )}
    </div>
  );
}
