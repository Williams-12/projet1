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

  const backgroundStyle = {
    backgroundImage: `url(${images[current]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    transition: 'background-image 1s ease-in-out',
    filter: 'brightness(0.4)',
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Section Hero */}
<div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
  <div
    className="slider-container position-absolute top-0 start-0 w-100 h-100"
    style={{ zIndex: -1 }}
  >
    <div
      className="slider-track d-flex"
      style={{
        width: `${images.length * 100}%`,
        transform: `translateX(-${(100 / images.length) * current}%)`,
        transition: 'transform 1s ease-in-out',
        height: '100%',
      }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="slider-image"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: `${100 / images.length}%`,
            filter: 'brightness(0.4)',
          }}
        />
      ))}
    </div>
  </div>

  <div className="d-flex flex-column justify-content-center align-items-center text-white text-center h-100 px-3">
    <h1 className="display-4 fw-bold">Bienvenue sur StudyZone</h1>
    <p className="lead">Une bibliothèque éducative conçue pour vous accompagner dans votre réussite académique.</p>
    <p>Accédez à des ressources fiables, enrichissez vos connaissances et progressez à votre rythme.</p>
    <a href="/bibliotheque" className="btn btn-light btn-lg mt-3">Explorer la bibliothèque</a>
  </div>
</div>


      {/* ***************************************** Section À propos ******************************************/}
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
              <h2 className="fw-bold mb-3">À propos de StudyZone</h2>
              <p className="text-muted">
                StudyZone est une plateforme éducative moderne qui centralise des ressources pour les étudiants,
                enseignants et autodidactes. Elle propose une bibliothèque organisée par matières, des supports téléchargeables,
                et une interface intuitive.
              </p>
              <p className="text-muted">
                Notre mission est de rendre le savoir accessible à tous, gratuitement, avec une touche de modernité et d’interaction.
              </p>
              <a href="/apropos" className="btn btn-primary mt-3">En savoir plus</a>
            </div>
          </div>
        </div>
      </section>

      {/* *********************************** section collection *****************************/}
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
    <h2 className="text-center fw-bold mb-5 text-white">Ressources phares</h2>

    <div className="row mb-4">
      <h4 className="mb-3">Épreuves</h4>
      {["Mathématiques", "Physique", "Histoire"].map((titre, i) => (
        <div
          key={i}
          className="col-md-4 mb-4"
          data-aos="zoom-in-up"
          data-aos-delay={i * 150}
        >
          <div className="card h-100 border-0 shadow resource-card hover-shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold">{titre}</h5>
              <p className="card-text text-muted">
                Une sélection d’épreuves récentes pour vous entraîner efficacement.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="row mb-4">
      <h4 className="mb-3">Cours</h4>
      {["Biologie", "Philosophie", "Géographie"].map((titre, i) => (
        <div
          key={i}
          className="col-md-4 mb-4"
          data-aos="flip-left"
          data-aos-delay={i * 150}
        >
          <div className="card h-100 border-0 shadow resource-card hover-shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold">{titre}</h5>
              <p className="card-text text-muted">
                Des cours clairs et structurés pour une compréhension approfondie.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="row mb-4">
      <h4 className="mb-3">Exercices</h4>
      {["Informatique", "Anglais", "Chimie"].map((titre, i) => (
        <div
          key={i}
          className="col-md-4 mb-4"
          data-aos="fade-up"
          data-aos-delay={i * 150}
        >
          <div className="card h-100 border-0 shadow resource-card hover-shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold">{titre}</h5>
              <p className="card-text text-muted">
                Entraînez-vous avec des exercices variés et progressifs.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-4">
      <a href="/bibliotheque" className="btn btn-light btn-lg px-5">Explorer plus</a>
    </div>
  </div>
</section>


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
        .ressources-section h4 {
          font-weight: bold;
          color: #2c3e50;
          border-left: 4px solid #0d6efd;
          padding-left: 10px;
          margin-bottom: 1rem;
        }
        .resource-card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          background: #f8f9fa;
        }
        .resource-card .card-title {
          color: #0d6efd;
        }
        .resource-card .card-text {
          font-size: 0.95rem;
        }
        .btn-primary {
          border-radius: 30px;
          font-weight: bold;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default Accueil;
