import React, { useEffect, useState } from 'react';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Accueil() {
  const images = [
    'https://i.pinimg.com/474x/ef/b3/cd/efb3cd6ec841a637008a5d4f8847c820.jpg',
    'https://i.pinimg.com/474x/ea/cb/d3/eacbd3ac6a3d097d54dd5a6d9c8f47b7.jpg',
    'https://i.pinimg.com/474x/cc/5a/f0/cc5af06cf95d175c30b0c16e962d02c7.jpg',
    'https://i.pinimg.com/474x/56/cd/ba/56cdba52308639041a8fd19e0406c588.jpg'
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      {/* ================= HERO ================== */}
      <header style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${images[current]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center text-white px-4" style={{ zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <h1 className="display-3 fw-bold animate__animated animate__fadeInDown">Bienvenue sur <span className="text-warning">StudyZone</span></h1>
          <p className="lead mt-3 animate__animated animate__fadeInUp">Votre espace pour réussir, apprendre, progresser chaque jour.</p>
          <a href="/bibliotheque" className="btn btn-warning btn-lg mt-4 px-4 py-2 fw-semibold shadow">Explorer la bibliothèque</a>
        </div>
      </header>

      {/* ================ A PROPOS ================ */}
      <section className="py-5 bg-light" id="apropos">
        <div className="container">
          <div className="row align-items-center" data-aos="fade-up">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://i.pinimg.com/474x/b2/da/f9/b2daf9019c4b08fa3a90c7d28a08a059.jpg"
                alt="À propos"
                className="img-fluid rounded shadow hover-zoom"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Pourquoi StudyZone ?</h2>
              <i className="text-muted">
                Parce que l’apprentissage ne doit pas être ennuyeux. Nous avons créé un espace moderne, dynamique et complet pour t’aider à atteindre tes objectifs scolaires.
              </i>
              <br />
              <br />
              <ul className="list-unstyled text-muted">
                <li>.Des ressources par matière, niveau, et type</li>
                <li>.Une interface fluide et intuitive</li>
                <li>.Un accès 100% gratuit</li>
              </ul>
              <a href="/apropos" className="btn btn-outline-primary mt-3 px-4">Découvrir la vision</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================ COLLECTION ================= */}
      <section 
        className="py-5 position-relative text-white"
        style={{
          backgroundImage: 'url(https://i.pinimg.com/474x/53/08/ff/5308ffac17f0f91a4601a0a9638a7d52.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="overlay position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 0 }}></div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <h2 className="text-center fw-bold mb-5 text-white">Nos meilleures ressources</h2>

          {/* Épreuves */}
          <div className="row mb-4">
            <h4 className="mb-3 text-warning">Épreuves</h4>
            {["Mathématiques", "Physique", "Histoire"].map((titre, i) => (
              <div key={i} className="col-md-4 mb-4" data-aos="zoom-in-up" data-aos-delay={i * 150}>
                <div className="card h-100 border-0 shadow-lg resource-card hover-shadow">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{titre}</h5>
                    <i className="card-text text-muted">Entraînez-vous avec les sujets d'examen les plus récents.</i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cours */}
          <div className="row mb-4">
            <h4 className="mb-3 text-warning">Cours</h4>
            {["Biologie", "Philosophie", "Géographie"].map((titre, i) => (
              <div key={i} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={i * 150}>
                <div className="card h-100 border-0 shadow-lg resource-card hover-shadow">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{titre}</h5>
                    <i className="card-text text-muted">Des explications claires pour booster votre compréhension.</i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Exercices */}
          <div className="row mb-4">
            <h4 className="mb-3 text-warning">Exercices</h4>
            {["Informatique", "Anglais", "Chimie"].map((titre, i) => (
              <div key={i} className="col-md-4 mb-4" data-aos="flip-left" data-aos-delay={i * 150}>
                <div className="card h-100 border-0 shadow-lg resource-card hover-shadow">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{titre}</h5>
                    <i className="card-text text-muted">Des exercices corrigés pour progresser pas à pas.</i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <a href="/bibliotheque" className="btn btn-outline-light btn-lg px-5">Voir toutes les ressources</a>
          </div>
        </div>
      </section>

      {/* ================= STYLE ================= */}
      <style>{`
        body {
          margin: 0;
        }
        .hover-zoom {
          transition: transform 0.3s ease;
        }
        .hover-zoom:hover {
          transform: scale(1.05);
        }
        .resource-card {
          border-radius: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          background: #f9f9f9;
        }
        .resource-card .card-title {
          color: #0d6efd;
        }
        .resource-card .card-text {
          font-size: 0.95rem;
        }
        .btn-warning {
          border-radius: 30px;
        }
        .btn-outline-light:hover {
          background-color: #fff;
          color: #000;
        }
        h1, p {
          text-shadow: 2px 2px 5px rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  );
}

export default Accueil;
