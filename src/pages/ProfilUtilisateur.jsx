// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profil.css'; // Assure-toi d’avoir ton fichier CSS ici

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login'); // redirige si non connecté
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-4 shadow-sm">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Avatar"
              className="rounded-circle mb-3"
              style={{ width: '80px', height: '80px' }}
            />
            <h5 className="fw-bold">{user.name}</h5>
          </div>
          <ul className="nav flex-column mt-4">
            <li className="nav-item"><a href="/accueil" className="nav-link">Accueil</a></li>
            <li className="nav-item"><a href="/bibliotheque" className="nav-link">Ressources</a></li>
            <li className="nav-item"><a href="/profil" className="nav-link active">Profil</a></li>
            <li className="nav-item"><a href="#" className="nav-link" onClick={handleLogout}>Déconnexion</a></li>
          </ul>
        </div>

        {/* Main dashboard */}
        <div className="col-md-9 p-5 bg-white">
          <h2 className="fw-bold mb-4">Bienvenue, {user.name}</h2>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card text-center shadow-sm p-3">
                <h5 className="fw-bold text-primary">Email</h5>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow-sm p-3">
                <h5 className="fw-bold text-primary">Rôle</h5>
                <p>{user.role}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center shadow-sm p-3">
                <h5 className="fw-bold text-primary">Dernière connexion</h5>
                <p>Aujourd'hui</p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm p-4">
                <h5 className="fw-bold">Statistiques rapides</h5>
                <ul className="list-unstyled mt-3">
                  <li>Cours suivis : 12</li>
                  <li>Exercices faits : 34</li>
                  <li>Épreuves validées : 7</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm p-4">
                <h5 className="fw-bold">Activité récente</h5>
                <ul className="list-unstyled mt-3">
                  <li>Exercice "Mathématiques 2" complété</li>
                  <li>Téléchargé "Cours de Physique"</li>
                  <li>Consulté "Épreuve Blanc Informatique"</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .nav-link {
          color: #333;
          transition: all 0.3s;
        }
        .nav-link:hover, .nav-link.active {
          color: #0d6efd;
          font-weight: bold;
        }
        .card {
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Profile;
