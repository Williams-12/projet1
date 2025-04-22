// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://studyzone-4gbd.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      alert('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
          <div
            className="card p-4 shadow-lg"
            style={{ width: '100%', maxWidth: '400px' }}
            data-aos="zoom-in"
          >
            <h2 className="text-center mb-4 fw-bold">Connexion</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Adresse Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@email.com"
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
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Se connecter
              </button>
              <div className="text-center mt-3">
                <a href="/register" className="text-decoration-none">Créer un compte</a>
              </div>
            </form>
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
      `}</style>
    </div>
  );
}

export default Login;
