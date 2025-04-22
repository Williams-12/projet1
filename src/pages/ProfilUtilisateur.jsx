import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './profil.css';

function ProfilUtilisateur() {
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0 rounded-4 profile-card">
        <div className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profil"
            className="rounded-circle me-4 border border-3 border-primary"
          />
          <div>
            <h2 className="fw-bold">👤 Mon Profil</h2>
            <p className="text-muted">Bienvenue dans votre espace personnel ✨</p>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> utilisateur@example.com</li>
              <li><strong>Niveau:</strong> Terminale</li>
              <li><strong>Statut:</strong> Étudiant</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-end">
          <button onClick={handleLogout} className="btn btn-danger">
            🚪 Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilUtilisateur;
