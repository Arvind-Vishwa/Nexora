import { useState, useEffect } from "react";
import "./Payement.css";
import axios from "axios";

export default function Payment({ cart, setCart }) {
  const [paid, setPaid] = useState(false);
  const [total, setTotal] = useState(0);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart")
      .then((res) => setTotal(res.data.total))
      .catch((err) => console.log("Error fetching total", err));
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/checkout", {
        items: cart,
      });

      console.log("Payment response:", res.data);

      setPaid(true);

      
      setCart([]);
    } catch (err) {
      console.log("Payment error", err);
    }
  };

  return (
    <div className="payment-container">
      <h2>Mock Payment</h2>

      {paid ? (
        <div className="payment-success">
          <h3> Payment Successful!</h3>
          <p>Receipt generated!</p>
          <p>Total Paid: ₹{total}</p>
        </div>
      ) : (
        <form className="payment-form" onSubmit={handlePayment}>
          <p>
            Total Amount: <b>₹{total}</b>
          </p>

          <input type="text" placeholder="Card Holder Name" required />
          <input type="number" placeholder="Card Number" required />

          <button type="submit">Pay Now</button>
        </form>
      )}
    </div>
  );
}
