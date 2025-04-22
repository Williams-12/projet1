import React from 'react';
import './APropos.css';

function APropos() {
  return (
    <div className="apropos-page">
      {/* Section Héro */}
      <div className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <div className="overlay"></div>
        <div className="content container animate__animated animate__fadeInDown">
          <h1 className="display-4 fw-bold">À propos de StudyZone</h1>
          <p className="lead mt-3">Une plateforme pensée pour booster votre apprentissage au quotidien.</p>
        </div>
      </div>

      {/* Section Détails */}
      <section className="container my-5 about-details">
        {/* Mission */}
        <div className="row align-items-center mb-5 wow fadeInUp">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://i.pinimg.com/474x/52/50/ab/5250ab493ee9553d8033352359adc3f1.jpg"
              className="img-fluid rounded shadow"
              alt="Notre mission"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Notre mission</h2>
            <p>
              Chez <strong>StudyZone</strong>, nous croyons que l’éducation de qualité doit être accessible à tous.
              Nous proposons des ressources fiables, engageantes et structurées pour accompagner les étudiants dans chaque étape de leur parcours.
            </p>
          </div>
        </div>

        {/* Valeurs */}
        <div className="row align-items-center flex-md-row-reverse wow fadeInUp">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://i.pinimg.com/474x/b4/5e/2f/b45e2fb4dcf90920d1a527439afa2f96.jpg"
              className="img-fluid rounded shadow"
              alt="Nos valeurs"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Nos valeurs</h2>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Accessibilité</strong> – Des contenus gratuits et pour tous.</li>
              <li className="mb-2"><strong>Qualité</strong> – Des documents pertinents et vérifiés.</li>
              <li className="mb-2"><strong>Innovation</strong> – Une expérience d’apprentissage fluide et moderne.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default APropos;
