import { Link } from 'react-router-dom';
import './MainHeader.css';

function MainHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg py-3 px-4">
      <Link className="navbar-brand fs-3 fw-bold text-uppercase" to="/">||StudyZone</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="mainNavbar">
        <ul className="navbar-nav ms-auto gap-4">

          {/* Accueil ajouté ici */}
          <li className="nav-item">
            <Link className="nav-link nav-big-link" to="/accueil">Accueil</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link nav-big-link" to="/bibliotheque">Bibliothèque</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-big-link" to="/ProfilUtilisateur">Profil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-big-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-danger ms-3"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MainHeader;
