import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function MainHeader() {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { text: "ACCUEIL", path: "/" },
    { text: "BIBLIOTHEQUE", path: "/bibliotheque" },
    { text: "PROFIL", path: "/profil" },
    { text: "APROPOS", path: "/apropos" },
    { text: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="main-header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/src/assets/logo.png" alt="Logo" className="logo" />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
        {links.map(({ text, path }, index) => {
          const isActive = currentPath === path;
          return (
            <li key={index}>
              <Link
                to={path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {text}
              </Link>
            </li>
          );
        })}
        <li>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/home';
            }}
          >
            LOGIN
          </button>
        </li>
      </ul>

      {/* ✅ Embedded Styles */}
      <style>{`
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          background: #fff;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

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

        .menu-toggle {
          display: none;
          font-size: 26px;
          background: none;
          border: none;
          margin-left: 16px;
          cursor: pointer;
          color: #0d6efd;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          position: relative;
          text-decoration: none;
          font-weight: 600;
          color: #facd05;
          padding: 8px 10px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 3px;
          background-color: #0d6efd;
          transition: width 0.4s ease;
          border-radius: 5px;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: #0d6efd;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .logout-btn {
          border: 2px solid #dc3545;
          background-color: transparent;
          color: #dc3545;
          font-weight: bold;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background-color: #dc3545;
          color: white;
        }

        /* ✅ Responsive */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 70px;
            right: 24px;
            background: white;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            animation: slideDown 0.3s ease forwards;
          }

          .nav-links.show {
            display: flex;
          }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </nav>
  );
}

export default MainHeader;
