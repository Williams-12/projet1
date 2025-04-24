// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="logo-link">
          <img src="./src/assets/brand.png" alt="Logo" className="logo" />
        </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item me-2">
            <Link to="/login" className="btn btn-outline-light">
              Connexion
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="btn btn-primary">
              Inscription
            </Link>
          </li>
        </ul>
      </div>
      <style>
        {`
         .logo-container {
          display: flex;
          align-items: center;
        }

        .logo-link {
          text-decoration: none;
        }

        .logo {
          height: 50px;
          object-fit: contain;
          border-radius: 8px;
        }

        `}
      </style>
    </nav>
  );
}

export default Navbar;
