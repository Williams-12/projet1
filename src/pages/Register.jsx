// src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://studyzone-4gbd.onrender.com/api/auth/register', {
        name,
        email,
        password,
        role: 'eleve',
      });
      alert('Inscription réussie !');
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de l’inscription.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Nom</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            S’inscrire
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
