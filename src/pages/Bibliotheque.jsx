import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bibliotheque.css';
import { FaBook, FaFlask, FaGlobe } from 'react-icons/fa';

function getMatiereIcon(matiere) {
  switch (matiere?.toLowerCase()) {
    case 'maths': return <FaFlask className="matiere-icon text-warning" />;
    case 'français': return <FaBook className="matiere-icon text-danger" />;
    case 'géographie': return <FaGlobe className="matiere-icon text-success" />;
    default: return <FaBook className="matiere-icon text-primary" />;
  }
}

function Bibliotheque() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matiere, setMatiere] = useState('');
  const [niveau, setNiveau] = useState('');
  const [enseignant, setEnseignant] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitre, setSearchTitre] = useState('');
  const docsPerPage = 6;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('https://studyzone-4gbd.onrender.com/api/documents');
      const cleanData = res.data.map(doc => ({
        ...doc,
        matiere: doc.matiere?.replace(/"/g, ''),
        niveau: doc.niveau?.replace(/"/g, ''),
        enseignant: doc.enseignant?.replace(/"/g, ''),
        titre: doc.titre?.replace(/"/g, ''),
        description: doc.description?.replace(/"/g, ''),
      }));
      setDocuments(cleanData);
      setFilteredDocs(cleanData);
    } catch (err) {
      console.error("Erreur lors de la récupération des documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...documents];
    if (matiere) result = result.filter(doc => doc.matiere === matiere);
    if (niveau) result = result.filter(doc => doc.niveau === niveau);
    if (enseignant) result = result.filter(doc => doc.enseignant === enseignant);
    if (searchTitre) result = result.filter(doc => doc.titre?.toLowerCase().includes(searchTitre.toLowerCase()));
    if (sort === 'niveau') result.sort((a, b) => a.niveau.localeCompare(b.niveau));
    if (sort === 'date') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredDocs(result);
    setCurrentPage(1);
  }, [matiere, niveau, enseignant, sort, searchTitre, documents]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirstDoc, indexOfLastDoc);
  const totalPages = Math.ceil(filteredDocs.length / docsPerPage);

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5 text-gradient rainbow-text">Bibliothèque Éducative</h1>
        <p className="lead text-muted">Explorez des documents soigneusement classés, enrichis, et inspirants</p>
      </div>

      {/* Filtres */}
      <div className="row g-3 mb-4 animate__animated animate__fadeIn">
        <div className="col-md-3">
          <select className="form-select shadow-sm" onChange={(e) => setMatiere(e.target.value)}>
            <option value="">Toutes les matières</option>
            {[...new Set(documents.map(d => d.matiere))].map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select shadow-sm" onChange={(e) => setNiveau(e.target.value)}>
            <option value="">Tous les niveaux</option>
            {[...new Set(documents.map(d => d.niveau))].map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select shadow-sm" onChange={(e) => setEnseignant(e.target.value)}>
            <option value="">Tous les enseignants</option>
            {[...new Set(documents.map(d => d.enseignant))].map((e, i) => (
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control shadow-sm" placeholder="Rechercher par titre..." onChange={(e) => setSearchTitre(e.target.value)} />
        </div>
      </div>

      {/* Tri */}
      <div className="text-end mb-3">
        <select className="form-select w-auto d-inline shadow-sm" onChange={(e) => setSort(e.target.value)}>
          <option value="">Trier par</option>
          <option value="date">Plus récents</option>
          <option value="niveau">Niveau</option>
        </select>
      </div>

      {/* Affichage des documents */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : currentDocs.length === 0 ? (
        <div className="text-center text-muted">Aucun document trouvé.</div>
      ) : (
        <div className="row g-4">
          {currentDocs.map(doc => (
            <div className="col-md-6 col-lg-4" key={doc._id}>
              <div className="card glass-card shadow-lg border-0 ressource-card-hover animated-card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    {getMatiereIcon(doc.matiere)}
                    <h5 className="fw-semibold ms-2 mb-0 text-capitalize">{doc.titre || doc.matiere}</h5>
                  </div>
                  <p className="mb-1"><strong>Matière :</strong> {doc.matiere}</p>
                  <p className="mb-1"><strong>Niveau :</strong> {doc.niveau}</p>
                  <p className="mb-1"><strong>Enseignant :</strong> {doc.enseignant}</p>
                  {doc.description && (
                    <p className="text-muted small mt-2">{doc.description}</p>
                  )}
                  {doc.fichierUrl && (
                    <a
                      href={doc.fichierUrl.startsWith('http') ? doc.fichierUrl : `https://studyzone-4gbd.onrender.com/uploads/${doc.fichierUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm mt-auto rounded-pill"
                    >
                      📄 Voir le document
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Bibliotheque;
