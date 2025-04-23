import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const isLoggedIn = localStorage.getItem('user');
    
    // ✅ Redirige vers /accueil si déjà connecté et vient de /register
    if (isLoggedIn && location.pathname === '/register') {
      navigate('/accueil');
    }
  }, [navigate, location.pathname]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('https://studyzone-4gbd.onrender.com/api/auth/register', {
        name,
        email,
        password,
        role: 'eleve',
      });

      setSuccessMessage('✅ Inscription réussie ! Redirection en cours...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const message = err?.response?.data?.message || "Erreur lors de l’inscription.";
      alert(message);
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="overlay">
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
          <div
            className="card p-4 shadow-lg"
            style={{ width: '100%', maxWidth: '450px' }}
            data-aos="fade-up"
          >
            <h2 className="text-center mb-4 fw-bold">Inscription</h2>

            {successMessage && (
              <div className="alert alert-success text-center" data-aos="fade-in">
                {successMessage}
                {loading && (
                  <div className="spinner-border text-success ms-2" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Williams GOUBALI"
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Adresse Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@email.com"
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
                {loading ? 'Inscription...' : 'S’inscrire'}
              </button>
              <div className="text-center mt-3">
                Déjà inscrit ? <a href="/login" className="text-decoration-none">Se connecter</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .register-page {
          background-image: url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=80');
          background-size: cover;
          background-position: center;
          height: 100vh;
          position: relative;
        }

        .overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.6);
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Register;
