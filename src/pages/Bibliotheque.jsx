import React from 'react';
import { Link } from 'react-router-dom';
import './Bibliotheque.css';

function Bibliotheque() {
  const ressources = {
    epreuves: [
      { titre: 'Épreuve Maths', image: 'https://i.pinimg.com/474x/aa/76/e6/aa76e6e2b6181ca70b2806f80ee3493e.jpg', lien: '#' },
      { titre: 'Épreuve Physique', image: 'https://i.pinimg.com/736x/45/5d/74/455d74c85042ba07d2856217adc3ab78.jpg', lien: '#' },
      { titre: 'Épreuve SVT', image: 'https://i.pinimg.com/474x/98/1a/6c/981a6cede97b016ab2e9faf9556749fe.jpg', lien: '#' },
    ],
    exercices: [
      { titre: 'Exercice Maths', image: 'https://i.pinimg.com/474x/39/1a/1c/391a1c824ed99ee97f48a5624a0fafbe.jpg', lien: '#' },
      { titre: 'Exercice Chimie', image: 'https://i.pinimg.com/474x/7a/7b/e8/7a7be8e0b1c08981dead920d1155b0d3.jpg', lien: '#' },
      { titre: 'Exercice Français', image: 'https://i.pinimg.com/474x/46/f5/f4/46f5f4dc34bf3d8e38c1c45575c6a3e4.jpg', lien: '#' },
    ],
    cours: [
      { titre: 'Cours Informatique', image: 'https://i.pinimg.com/474x/20/ac/2e/20ac2e6cc2ffb00d81ca88242627234d.jpg', lien: '#' },
      { titre: 'Cours Anglais', image: 'https://i.pinimg.com/474x/0e/1f/a9/0e1fa9aa7c4368962a444e287f4a57fe.jpg', lien: '#' },
      { titre: 'Cours Histoire', image: 'https://i.pinimg.com/474x/97/fb/ab/97fbab770edfe474f60cb3758e49fb73.jpg', lien: '#' },
    ],
  };

  const renderSection = (titre, data, type) => (
    <div className="ressource-section mb-5">
      <h3 className="section-title">{titre}</h3>
      <div className="row g-4">
        {data.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card ressource-card h-100 shadow-sm">
              <img src={item.image} className="card-img-top ressource-img" alt={item.titre} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{item.titre}</h5>
                <a href={item.lien} className="btn btn-outline-primary mt-auto">Voir le document</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-end mt-4">
        <Link to={`/ressources/${type}`} className="btn btn-primary px-4 rounded-pill">Voir plus</Link>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-gradient">Explorez Nos Ressources</h1>
        <p className="lead text-muted">Découvrez les épreuves, exercices et cours par matière</p>
      </div>
      {renderSection("Épreuves", ressources.epreuves, "epreuves")}
      {renderSection("Exercices", ressources.exercices, "exercices")}
      {renderSection("Cours", ressources.cours, "cours")}
    </div>
  );
}

export default Bibliotheque;
