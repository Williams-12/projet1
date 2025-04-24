import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import MainHeader from './MainHeader';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showColors, setShowColors] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isHomePage = location.pathname === '/';

  const colors = ['#047891', '#780064', '#00781e', '#ff6f00', '#4a00e0', '#0099cc'];
  const toggleColors = () => setShowColors(!showColors);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className="d-flex flex-column min-vh-100 position-relative"
      style={{
        backgroundColor: isDarkMode ? '#121212' : backgroundColor,
        color: isDarkMode ? '#f1f1f1' : '#000',
        transition: 'background-color 0.5s ease, color 0.5s ease',
      }}
    >
      {isHomePage ? <Navbar /> : <MainHeader />}

      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />

      {/* 🎨 Bouton flottant couleurs */}
      <div
        onClick={toggleColors}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#fab505',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          animation: 'bounce 2s infinite',
          zIndex: 2000,
          border: '2px solid',
        }}
        title="Changer la couleur de fond"
      >
        ⚙️
      </div>

      {showColors && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 2000,
          }}
        >
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                setBackgroundColor(color);
                setShowColors(false);
              }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: color,
                border: '2px solid #fff',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(255, 183, 0, 0.93)',
              }}
              title={`Changer le fond en ${color}`}
            />
          ))}
        </div>
      )}

      {/* 🌙 Thème sombre/clair */}
      <div
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: isDarkMode ? '#222' : '#eee',
          color: isDarkMode ? '#fff' : '#333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          zIndex: 2000,
        }}
        title="Changer le thème sombre / clair"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .dark-theme {
            background-color: #121212 !important;
            color: #f1f1f1 !important;
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
