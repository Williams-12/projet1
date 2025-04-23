import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-white">
      <style>{`
        .big-404 {
          font-size: 100px;
          font-weight: bold;
          color: #007bff;
        }
        .error-message {
          font-size: 20px;
          color: #6c757d;
          margin-bottom: 20px;
        }
        .back-home-btn {
          background-color: #007bff;
          color: white;
          padding: 10px 25px;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
        .back-home-btn:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div>
        <div className="big-404">404</div>
        <div className="error-message">Page introuvable</div>
        <Link to="/accueil" className="back-home-btn">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

export default NotFound;
