import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Ressources() {
  const { type } = useParams(); // 'epreuves', 'exercices', 'cours'
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [niveauFiltre, setNiveauFiltre] = useState('');
  const [tri, setTri] = useState('');
  const [page, setPage] = useState(1);
  const documentsParPage = 6;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('https://studyzone-4gbd.onrender.com/api/documents');
        console.log("Documents reçus:", res.data);

        // Meilleur filtrage par type
        const filtered = res.data.filter(doc =>
          doc.type && doc.type.toLowerCase() === type.toLowerCase()
        );

        setDocuments(filtered);
      } catch (err) {
        console.error("Erreur lors de la récupération des documents :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [type]);

  const documentsFiltres = documents
    .filter(doc => (niveauFiltre ? doc.niveau === niveauFiltre : true))
    .sort((a, b) => {
      if (tri === 'matiere') return a.matiere.localeCompare(b.matiere);
      if (tri === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const indexDebut = (page - 1) * documentsParPage;
  const indexFin = indexDebut + documentsParPage;
  const documentsPage = documentsFiltres.slice(indexDebut, indexFin);
  const pagesTotales = Math.ceil(documentsFiltres.length / documentsParPage);

  const niveauxDisponibles = [...new Set(documents.map(doc => doc.niveau))];

  return (
    <div className="container py-5">
      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, #007bff, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ressource-card {
          border-radius: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ressource-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        .spinner-border {
          width: 3rem;
          height: 3rem;
        }
      `}</style>

      <div className="text-center mb-5">
        <h1 className="fw-bold display-5 text-capitalize text-gradient">
          Toutes les {type}
        </h1>
        <p className="lead text-muted">
          Retrouvez ici toutes les {type} disponibles par matière.
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <select className="form-select" value={niveauFiltre} onChange={e => setNiveauFiltre(e.target.value)}>
            <option value="">Tous les niveaux</option>
            {niveauxDisponibles.map((niveau, i) => (
              <option key={i} value={niveau}>{niveau}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={tri} onChange={e => setTri(e.target.value)}>
            <option value="">Trier par</option>
            <option value="matiere">Matière (A-Z)</option>
            <option value="date">Date (récent d'abord)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : documentsPage.length > 0 ? (
        <>
          <div className="row g-4">
            {documentsPage.map((doc, index) => (
              <div className="col-md-4" key={index}>
                <div className="card ressource-card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{doc.matiere}</h5>
                    <p className="text-muted">Niveau : {doc.niveau}</p>
                    <p className="text-muted small">Par : {doc.enseignant}</p>
                    <a
                      href={`https://studyzone-4gbd.onrender.com/uploads/${doc.fichierUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary mt-auto"
                    >
                      Voir le document
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-primary me-2" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Précédent
            </button>
            <span className="align-self-center px-3">Page {page} / {pagesTotales}</span>
            <button className="btn btn-outline-primary" disabled={page === pagesTotales} onClick={() => setPage(p => p + 1)}>
              Suivant
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-muted">
          <p>Aucun document trouvé pour cette catégorie.</p>
        </div>
      )}
    </div>
  );
}

export default Ressources;