import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row justify-content-between">

          {/* Colonne 1 - Présentation */}
          <div className="col-md-3 mb-4">
            <h4 className="fw-bold text-light">StudyZone</h4>
            <p className="text-muted">Une plateforme moderne dédiée à l'apprentissage et à la réussite académique.</p>
          </div>

          {/* Colonne 2 - Navigation */}
          <div className="col-md-3 mb-4">
            <h5 className="text-light">Navigation</h5>
            <ul className="list-unstyled">
              <li><a href="/accueil" className="footer-link">Accueil</a></li>
              <li><a href="/bibliotheque" className="footer-link">Bibliothèque</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/apropos" className="footer-link">À propos</a></li> {/* ✅ Lien ajouté ici */}
              <li><a href="/politique" className="footer-link">Politique de confidentialité</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Suivez-nous */}
          <div className="col-md-3 mb-4">
            <h5 className="text-light">Suivez-nous</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="social-icon text-light"><FaFacebookF /></a>
              <a href="#" className="social-icon text-light"><FaTwitter /></a>
              <a href="#" className="social-icon text-light"><FaLinkedinIn /></a>
              <a href="#" className="social-icon text-light"><FaYoutube /></a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted small">
          &copy; {new Date().getFullYear()} StudyZone. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
