import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { FaHome, FaBook, FaUser, FaSignOutAlt, FaCamera, FaPlus } from 'react-icons/fa';
import './profil.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem('profilePic') ||
      'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [documentForm, setDocumentForm] = useState({
    titre: '',
    matiere: '',
    niveau: '',
    enseignant: '',
    type: '',
    fichierUrl: null,
  });
  const [message, setMessage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditForm({ name: parsedUser.name, email: parsedUser.email });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  const toggleAddForm = () => setShowAddForm(!showAddForm);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (e) => {
    const { name, value, files } = e.target;
    setDocumentForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://studyzone-4gbd.onrender.com/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        setIsEditing(false);
        setMessage('Profil mis à jour avec succès.');
      } else {
        setMessage(data.message || 'Erreur lors de la mise à jour.');
      }
    } catch (error) {
      setMessage('Erreur serveur.');
    }
  };

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('titre', documentForm.titre);
      formData.append('matiere', documentForm.matiere);
      formData.append('niveau', documentForm.niveau);
      formData.append('enseignant', documentForm.enseignant);
      formData.append('fichierUrl', documentForm.fichierUrl);
      formData.append('type', documentForm.type);

      const response = await fetch('https://studyzone-4gbd.onrender.com/api/documents/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess(true);
        setDocumentForm({
          titre: '',
          matiere: '',
          niveau: '',
          enseignant: '',
          type: '',
          fichierUrl: null,
        });
        setShowAddForm(false);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        const data = await response.json();
        setMessage(data.message || 'Erreur lors de l’envoi du document.');
      }
    } catch (error) {
      setMessage('Erreur serveur lors de l’envoi.');
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container d-flex min-vh-100">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-4 animate__animated animate__fadeInLeft">
        <div className="text-center mb-4">
          <img
            src={profilePic}
            alt="Avatar"
            className="rounded-circle border border-3 border-light"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <h5 className="mt-3">{user.name}</h5>
          <label className="btn btn-sm btn-outline-light mt-2">
            <FaCamera className="me-2" />
            Modifier
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>
        </div>
        <nav className="nav flex-column">
          <a href="/" className="nav-link text-white">
            <FaHome className="me-2" /> Accueil
          </a>
          <a href="/bibliotheque" className="nav-link text-white">
            <FaBook className="me-2" /> Ressources
          </a>
          <a href="/profil" className="nav-link text-info fw-bold">
            <FaUser className="me-2" /> Profil
          </a>
          <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Déconnexion
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5 bg-light animate__animated animate__fadeInRight position-relative">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">Bienvenue, {user.name}</h2>
          <div className="d-flex gap-3">
            <button className="btn btn-outline-success d-flex align-items-center" onClick={toggleAddForm}>
              <FaPlus className="me-2" /> Ajouter un document
            </button>
            <button className="btn btn-outline-primary" onClick={toggleEdit}>
              ✏️ Modifier profil
            </button>
          </div>
        </div>

        {message && <div className="alert alert-info">{message}</div>}
        {uploadSuccess && <div className="alert alert-success">Document ajouté avec succès !</div>}

        {showAddForm && (
          <div className="glass-card p-4 mb-4 animate__animated animate__fadeInUp">
            <h5 className="fw-bold mb-3">Ajouter un document</h5>
            <form onSubmit={handleDocumentSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Titre</label>
                <input
                  type="text"
                  name="titre"
                  value={documentForm.titre}
                  onChange={handleDocumentChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Matière</label>
                <input
                  type="text"
                  name="matiere"
                  value={documentForm.matiere}
                  onChange={handleDocumentChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Niveau</label>
                <input
                  type="text"
                  name="niveau"
                  value={documentForm.niveau}
                  onChange={handleDocumentChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Enseignant</label>
                <input
                  type="text"
                  name="enseignant"
                  value={documentForm.enseignant}
                  onChange={handleDocumentChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  name="type"
                  value={documentForm.type}
                  onChange={handleDocumentChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Fichier</label>
                <input
                  type="file"
                  name="fichierUrl"
                  onChange={handleDocumentChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Envoyer</button>
            </form>
          </div>
        )}

        {isEditing && (
          <div className="glass-card p-4 mb-4 animate__animated animate__fadeInUp">
            <h5 className="fw-bold mb-3">Modifier mes informations</h5>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={editForm.email}
                  onChange={handleEditChange}
                />
              </div>
              <button type="submit" className="btn btn-success">Enregistrer</button>
            </form>
          </div>
        )}

        <div className="row g-4">
          <div className="col-md-4">
            <div className="glass-card text-center p-4">
              <h6 className="text-primary">Email</h6>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card text-center p-4">
              <h6 className="text-primary">Rôle</h6>
              <p>{user.role}</p>
            </div>
          </div>
          {/* Tu peux ajouter ici d'autres infos comme stats ou documents récents */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
