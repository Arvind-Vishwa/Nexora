import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount }) { 

  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">

        <h2 className="nav-logo">
          <Link to="/home">Mock-E-com</Link>
        </h2>

        {/* Desktop + Mobile Menu */}
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><Link to="/home" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>

          <li>
            <Link to="/cart" onClick={() => setOpen(false)}>
              Cart ({cartCount})
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <div className="nav-toggle" onClick={() => setOpen(!open)}>
          ☰
        </div>

      </div>
    </nav>
  );
}
