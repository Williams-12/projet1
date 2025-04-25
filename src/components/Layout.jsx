import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import MainHeader from './MainHeader';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isNavBarPage = location.pathname === '/home';

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className="d-flex flex-column min-vh-100 position-relative"
      style={{
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        color: isDarkMode ? '#f1f1f1' : '#000',
        transition: 'background-color 0.5s ease, color 0.5s ease',
      }}
    >
      {/* ✅ Header dynamique */}
      {isNavBarPage ? <Navbar /> : <MainHeader />}

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />

      {/* 🌙 Thème sombre/clair
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
          .dark-theme {
            background-color: #121212 !important;
            color: #f1f1f1 !important;
          }
        `}
      </style> */}
    </div>
  );
}

export default Layout;
