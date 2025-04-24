import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://studyzone-4gbd.onrender.com/api/auth/login', {
        identifiant,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const redirectTo = location.state?.from?.pathname || '/profil';
      navigate(redirectTo);
    } catch (err) {
      const message = err?.response?.data?.message || 'Erreur lors de la connexion.';
      setErrorMessage(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Toast d'erreur */}
      {errorMessage && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-bg-danger border-0">
            <div className="d-flex">
              <div className="toast-body">{errorMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setErrorMessage('')}
              ></button>
            </div>
          </div>
        </div>
      )}

      <div className="login-page">
        <div className="overlay">
          <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div
              className="card p-4 shadow-lg"
              style={{ width: '100%', maxWidth: '420px' }}
              data-aos="zoom-in"
            >
              <h2 className="text-center mb-4 fw-bold">Connexion</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email ou Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    value={identifiant}
                    onChange={(e) => setIdentifiant(e.target.value)}
                    required
                    placeholder="exemple@email.com ou votre nom"
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
                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                <div className="text-center mt-3">
                  <a href="/register" className="text-decoration-none">Créer un compte</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          background-image: url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1400&q=80');
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

        @media (max-width: 576px) {
          .card {
            margin: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Login;
