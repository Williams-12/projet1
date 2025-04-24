import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-auto" data-aos="fade-up">
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
              <li><a href="/apropos" className="footer-link">À propos</a></li>
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

          {/* Colonne 4 - Application Mobile */}
          <div className="col-md-3 mb-4">
            <h5 className="text-light">Téléchargez l'app</h5>
            <p className="text-muted mb-2">Disponible bientôt sur mobile.</p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://i.pinimg.com/474x/2d/b1/b0/2db1b0c38a22cad84c474d276eabc30f.jpg" 
                alt="Disponible sur Google Play"
                style={{ height: '45px' }}
                className="hover-zoom"
              />
            </a>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted small">
          &copy; {new Date().getFullYear()} StudyZone. Tous droits réservés.
        </div>
      </div>

      {/* ==== STYLE INTERNE SUPPLÉMENTAIRE ==== */}
      <style>{`
        .footer-link {
          color: #bbb;
          text-decoration: none;
        }
        .footer-link:hover {
          color: #fff;
        }
        .social-icon {
          font-size: 1.2rem;
        }
        .hover-zoom {
          transition: transform 0.3s ease;
        }
        .hover-zoom:hover {
          transform: scale(1.05);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
