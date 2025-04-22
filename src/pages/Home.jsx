import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
  return (
    <>
      <div
        className="home-hero d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/474x/fc/a5/1e/fca51e2e0b0e2d989272a5bf2f68282d.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '90vh',
          position: 'relative',
        }}
      >
        {/* Overlay sombre pour lisibilité */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        ></div>

        {/* Contenu centré */}
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold">Bienvenue sur EduZone</h1>
          <p className="lead">
            Une plateforme complète pour apprendre, progresser et réussir à ton rythme.
          </p>
          <p>
            Accède à des cours, des exercices, des quiz et des ressources pédagogiques à tout moment.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-primary me-3">Se connecter</Link>
            <Link to="/register" className="btn btn-outline-light">Créer un compte</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
