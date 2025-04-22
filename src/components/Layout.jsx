import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import Footer from './Footer';

function Layout() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showColors, setShowColors] = useState(false);

  const colors = ['#047891', '#780064', '#00781e', '#ff6f00', '#4a00e0', '#0099cc'];

  const toggleColors = () => setShowColors(!showColors);

  return (
    <div className="d-flex flex-column min-vh-100 position-relative" style={{ backgroundColor, transition: 'background-color 0.5s ease' }}>
      <MainHeader />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />

      {/* Bouton de paramètres flottant */}
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
          border: '2px solid'
        }}
        title="Changer la couleur de fond"
      >
        <span style={{ color: '#fa1105', fontSize: '24px' }}>⚙️</span>
      </div>

      {/* Cercles de couleurs */}
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

      {/* Animation CSS */}
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
        `}
      </style>
    </div>
  );
}

export default Layout;
