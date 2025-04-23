import { Link } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const messages = [
    "Accède à des cours interactifs",
    "Entraîne-toi avec des exercices variés",
    "Teste-toi avec des quiz réguliers",
    "Réussis avec StudyZone",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="home-hero d-flex align-items-center justify-content-center text-white text-center"
        style={{
          backgroundImage: `url('https://i.pinimg.com/474x/b4/5e/2f/b45e2fb4dcf90920d1a527439afa2f96.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        {/* Overlay sombre */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 1 }}
        ></div>

        {/* Contenu centré */}
        <div className="container position-relative" style={{ zIndex: 2 }} data-aos="fade-up">
          <h1 className="display-3 fw-bold mb-3">
            Bienvenue sur <span className="highlight-text">StudyZone</span>
          </h1>
          <p className="lead typewriter">
            {messages[currentMessageIndex]}
            <span className="cursor">|</span>
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/login" className="btn btn-lg btn-primary custom-btn">Se connecter</Link>
            <Link to="/register" className="btn btn-lg btn-outline-light custom-btn">Créer un compte</Link>
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <section className="testimonials bg-light py-5">
        <div className="container text-center" data-aos="fade-up">
          <h2 className="fw-bold mb-5 display-6">Ce que disent nos utilisateurs</h2>
          <div className="row justify-content-center g-4">

            {/* Témoignage 1 */}
            <div className="col-md-4">
              <div className="card shadow testimonial-card h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" className="testimonial-img mb-3" />
                  <div className="stars mb-2 text-warning">★★★★★</div>
                  <p className="card-text">“StudyZone m’a aidé à progresser rapidement. J’adore la plateforme !”</p>
                  <h6 className="fw-bold mt-3">— Sarah, Lycéenne</h6>
                </div>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="col-md-4">
              <div className="card shadow testimonial-card h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Maxime" className="testimonial-img mb-3" />
                  <div className="stars mb-2 text-warning">★★★★★</div>
                  <p className="card-text">“Les exercices sont top et les cours super bien expliqués. Bravo !”</p>
                  <h6 className="fw-bold mt-3">— Maxime, Étudiant BTS</h6>
                </div>
              </div>
            </div>

            {/* Témoignage 3 */}
            <div className="col-md-4">
              <div className="card shadow testimonial-card h-100">
                <div className="card-body d-flex flex-column align-items-center">
                  <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Aya" className="testimonial-img mb-3" />
                  <div className="stars mb-2 text-warning">★★★★★</div>
                  <p className="card-text">“C’est motivant, clair et moderne. Je recommande à tous mes amis.”</p>
                  <h6 className="fw-bold mt-3">— Aya, Collégienne</h6>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

export default Home;
