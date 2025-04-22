import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Bibliotheque() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [matiere, setMatiere] = useState('');
  const [niveau, setNiveau] = useState('');
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [filtreMatiere, setFiltreMatiere] = useState('');
  const [filtreNiveau, setFiltreNiveau] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const matieresSecondCycle = [
    "Mathématiques", "Physique-Chimie", "SVT", "Philosophie",
    "Histoire-Géographie", "Français", "Anglais", "Espagnol",
    "Allemand", "Informatique", "Économie", "Sciences Sociales"
  ];

  const niveaux = [
    "6ème", "5ème", "4ème", "3ème",
    "2nde", "1ère", "Terminale",
    "Universitaire"
  ];

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('https://studyzone-4gbd.onrender.com/documents', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDocuments(res.data);
      setFilteredDocs(res.data);
    } catch (err) {
      console.error("Erreur de chargement des documents", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !matiere || !niveau) {
      alert('Tous les champs sont requis.');
      return;
    }

    const formData = new FormData();
    formData.append('fichierUrl', file);
    formData.append('matiere', matiere);
    formData.append('niveau', niveau);

    try {
      await axios.post('https://studyzone-4gbd.onrender.com/documents', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Document téléversé ✅');
      setFile(null);
      setMatiere('');
      setNiveau('');
      fetchDocuments();
    } catch (err) {
      alert('Erreur de téléversement ❌');
      console.error(err);
    }
  };

  const filtrerDocuments = () => {
    const resultats = documents.filter(doc => {
      const matiereMatch = filtreMatiere ? doc.matiere === filtreMatiere : true;
      const niveauMatch = filtreNiveau ? doc.niveau === filtreNiveau : true;
      const searchMatch = searchTerm
        ? (
          doc.matiere?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.niveau?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.nom?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : true;

      return matiereMatch && niveauMatch && searchMatch;
    });

    setFilteredDocs(resultats);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    filtrerDocuments();
  }, [filtreMatiere, filtreNiveau, searchTerm, documents]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">📚 Bibliothèque de Ressources</h2>
        <p className="text-muted">Trouvez et partagez vos meilleurs documents</p>
      </div>

      <form onSubmit={handleUpload} className="bg-dark text-white p-4 rounded shadow mb-5">
        <h4 className="mb-4">📤 Ajouter un document</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
          <div className="col-md-4">
            <input type="text" placeholder="Matière" className="form-control" value={matiere} onChange={(e) => setMatiere(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <select className="form-select" value={niveau} onChange={(e) => setNiveau(e.target.value)} required>
              <option value="">Choisir un niveau</option>
              {niveaux.map((n, i) => (
                <option key={i} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-success px-4">Téléverser</button>
        </div>
      </form>

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div className="d-flex gap-2 flex-wrap">
          <select className="form-select" value={filtreMatiere} onChange={(e) => setFiltreMatiere(e.target.value)}>
            <option value="">Toutes les matières</option>
            {matieresSecondCycle.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
          <select className="form-select" value={filtreNiveau} onChange={(e) => setFiltreNiveau(e.target.value)}>
            <option value="">Tous les niveaux</option>
            {niveaux.map((n, i) => (
              <option key={i} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Rechercher un mot-clé..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredDocs.length > 0 ? (
        <div className="row g-4">
          {filteredDocs.map((doc, i) => (
            <div key={i} className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{doc.matiere} - {doc.niveau}</h5>
                  <p className="card-text"><small className="text-muted">Fichier disponible</small></p>
                  <a href={doc.fichierUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">📥 Télécharger</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning mt-4">Aucun document ne correspond à votre recherche.</div>
      )}
    </div>
  );
}

export default Bibliotheque;
