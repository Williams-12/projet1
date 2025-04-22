import React, { useEffect, useState } from 'react';

function Accueil() {
  const images = [
    'https://i.pinimg.com/474x/b6/aa/18/b6aa18a5a09816343d410073af19e326.jpg',
    'https://i.pinimg.com/474x/b6/aa/18/b6aa18a5a09816343d410073af19e326.jpg',
    'https://i.pinimg.com/474x/56/cd/ba/56cdba52308639041a8fd19e0406c588.jpg',
    'https://i.pinimg.com/474x/ef/b3/cd/efb3cd6ec841a637008a5d4f8847c820.jpg'
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

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
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <div style={backgroundStyle}></div>
      <div className="d-flex flex-column justify-content-center align-items-center text-white text-center h-100 px-3">
        <h1 className="display-4 fw-bold">Bienvenue sur StudyZone</h1>
        <p className="lead">
          Une bibliothèque éducative conçue pour vous accompagner dans votre réussite académique.
        </p>
        <p>
          Accédez à des ressources fiables, enrichissez vos connaissances et progressez à votre rythme.
        </p>
        <a href="/bibliotheque" className="btn btn-light btn-lg mt-3">Explorer la bibliothèque</a>
      </div>

      <style>{`
        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default Accueil;
