import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './APropos.css';
import { Link } from 'react-router-dom';

function APropos() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="apropos-page">
      {/* Section Héro */}
      <div className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <div className="overlay"></div>
        <div className="content container" data-aos="zoom-in">
          <h1 className="titre-a-propos display-3 fw-bold mb-3">
            <span>À propos de</span> <span className="highlight">StudyZone</span>
          </h1>
          <p className="lead mt-2">Une plateforme pensée pour booster votre apprentissage au quotidien.</p>
        </div>
      </div>

      {/* Détails */}
      <section className="container my-5 about-details">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
            <img
              src="https://i.pinimg.com/474x/52/50/ab/5250ab493ee9553d8033352359adc3f1.jpg"
              className="img-fluid rounded shadow"
              alt="Notre mission"
            />
          </div>
          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold mb-3">Notre mission</h2>
            <p>
              Chez <strong>StudyZone</strong>, nous croyons que l’éducation de qualité doit être accessible à tous.
              Nous proposons des ressources fiables, engageantes et structurées pour accompagner les élèves et étudiants à chaque étape de leur parcours.
            </p>
          </div>
        </div>

        <div className="row align-items-center flex-md-row-reverse mb-5">
          <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-left">
            <img
              src="https://i.pinimg.com/474x/b4/5e/2f/b45e2fb4dcf90920d1a527439afa2f96.jpg"
              className="img-fluid rounded shadow"
              alt="Nos valeurs"
            />
          </div>
          <div className="col-md-6" data-aos="fade-right">
            <h2 className="fw-bold mb-3">Nos valeurs</h2>
            <ul className="list-unstyled">
              <li className="mb-2"><strong>Accessibilité</strong> – Des contenus gratuits et pour tous.</li>
              <li className="mb-2"><strong>Qualité</strong> – Des documents pertinents et vérifiés.</li>
              <li className="mb-2"><strong>Innovation</strong> – Une expérience d’apprentissage fluide et moderne.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="team-section py-5 text-center bg-light">
        <div className="container" data-aos="fade-up">
          <h2 className="fw-bold mb-5">Notre Équipe</h2>
          <div className="row justify-content-center">
            {[
              {
                name: 'Williams GOUBALI',
                role: 'Développeur Backend',
                img: 'https://i.pinimg.com/474x/40/e3/18/40e318b1078b95f8663d20bf69acfc4e.jpg'
              },
              {
                name: 'Delphine KPANKPAN',
                role: 'Développeuse Backend',
                img: 'https://i.pinimg.com/474x/70/a2/36/70a236f90d2803f9da32d0558be75ba1.jpg'
              },
              {
                name: 'Cosme NOUHOHEFLIN',
                role: 'Développeur Front-End',
                img: 'https://i.pinimg.com/474x/b3/e5/db/b3e5db5a3bf1399f74500a6209462794.jpg'
              },
            ].map((member, index) => (
              <div key={index} className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay={index * 200}>
                <div className="card shadow-lg border-0 rounded-lg team-card">
                  <img src={member.img} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="text-muted">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bouton Contact */}
      <div className="text-center py-5" data-aos="fade-up">
        <Link to="/contact" className="contact-btn">
          Nous contacter
        </Link>
      </div>
    </div>
  );
}

export default APropos;
