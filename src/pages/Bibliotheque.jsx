import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bibliotheque.css';
import { FaBook, FaFlask, FaGlobe, FaPlusCircle } from 'react-icons/fa';

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
  const [alert, setAlert] = useState(null);

  // Formulaire ajout
  const [newDoc, setNewDoc] = useState({
    titre: '',
    matiere: '',
    niveau: '',
    enseignant: '',
    description: '',
    fichier: null,
  });

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

  const handleFileChange = (e) => {
    setNewDoc({ ...newDoc, fichier: e.target.files[0] });
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newDoc) {
      if (newDoc[key]) formData.append(key, newDoc[key]);
    }

    try {
      const res = await axios.post('https://studyzone-4gbd.onrender.com/api/documents', formData);
      setAlert({ type: 'success', message: 'Document ajouté avec succès !' });
      setNewDoc({ titre: '', matiere: '', niveau: '', enseignant: '', description: '', fichier: null });
      fetchDocuments();
    } catch (err) {
      setAlert({ type: 'danger', message: 'Erreur lors de l\'ajout du document.' });
      console.error(err);
    }

    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div className="container py-5">
      {alert && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      <div className="text-center mb-4">
        <h1 className="fw-bold display-5 text-gradient">Ressources disponibles</h1>
        <p className="lead text-muted">Explorez toutes les épreuves, exercices et cours</p>
      </div>

      <form className="card p-4 mb-5 shadow-sm" onSubmit={handleAddDocument}>
        <h4 className="mb-3"><FaPlusCircle className="me-2 text-success" />Ajouter un nouveau document</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Titre" value={newDoc.titre} onChange={(e) => setNewDoc({ ...newDoc, titre: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Matière" value={newDoc.matiere} onChange={(e) => setNewDoc({ ...newDoc, matiere: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Niveau" value={newDoc.niveau} onChange={(e) => setNewDoc({ ...newDoc, niveau: e.target.value })} required />
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Enseignant" value={newDoc.enseignant} onChange={(e) => setNewDoc({ ...newDoc, enseignant: e.target.value })} required />
          </div>
          <div className="col-md-12">
            <textarea className="form-control" placeholder="Description (optionnelle)" value={newDoc.description} onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}></textarea>
          </div>
          <div className="col-md-6">
            <input type="file" className="form-control" onChange={handleFileChange} required />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <button type="submit" className="btn btn-success w-100">Ajouter</button>
          </div>
        </div>
      </form>

      {/* Filtres */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <select className="form-select" onChange={(e) => setMatiere(e.target.value)}>
            <option value="">Toutes les matières</option>
            {[...new Set(documents.map(d => d.matiere))].map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" onChange={(e) => setNiveau(e.target.value)}>
            <option value="">Tous les niveaux</option>
            {[...new Set(documents.map(d => d.niveau))].map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" onChange={(e) => setEnseignant(e.target.value)}>
            <option value="">Tous les enseignants</option>
            {[...new Set(documents.map(d => d.enseignant))].map((e, i) => (
              <option key={i} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Rechercher par titre..." onChange={(e) => setSearchTitre(e.target.value)} />
        </div>
      </div>

      {/* Tri */}
      <div className="text-end mb-3">
        <select className="form-select w-auto d-inline" onChange={(e) => setSort(e.target.value)}>
          <option value="">Trier par</option>
          <option value="date">Plus récents</option>
          <option value="niveau">Niveau</option>
        </select>
      </div>

      {/* Affichage */}
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
              <div className="card shadow-sm h-100 border-0 ressource-card-hover animated-card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    {getMatiereIcon(doc.matiere)}
                    <h5 className="fw-semibold ms-2 mb-0">{doc.titre || doc.matiere}</h5>
                  </div>
                  <p className="mb-1"><strong>Matière :</strong> {doc.matiere}</p>
                  <p className="mb-1"><strong>Niveau :</strong> {doc.niveau}</p>
                  <p className="mb-1"><strong>Enseignant :</strong> {doc.enseignant}</p>
                  {doc.description && (
                    <p className="text-muted small mt-2">{doc.description}</p>
                  )}
                  {doc.fichierUrl ? (
                    <a
                      href={`https://studyzone-4gbd.onrender.com/uploads/${doc.fichierUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary mt-auto"
                    >
                      Voir le document
                    </a>
                  ) : (
                    <span className="btn btn-secondary disabled mt-auto">Pas de fichier</span>
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
          <ul className="pagination pagination-lg">
            {Array.from({ length: totalPages }, (_, i) => (
              <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i} onClick={() => setCurrentPage(i + 1)}>
                <button className="page-link" style={{ cursor: 'pointer' }}>{i + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Bibliotheque;
