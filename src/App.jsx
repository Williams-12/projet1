import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Accueil from './pages/Accueil';
import Contact from './pages/Contact';
import Bibliotheque from './pages/Bibliotheque';
import ProfilUtilisateur from './pages/ProfilUtilisateur';
import Login from './pages/Login';
import Register from './pages/Register';
import APropos from './pages/APropos';
import Ressources from './pages/Ressources';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute'; // ⬅️ Ajout

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="apropos" element={<APropos />} />

          {/* 🔒 Routes protégées */}
          <Route path="accueil" element={
            <PrivateRoute>
              <Accueil />
            </PrivateRoute>
          } />
          <Route path="bibliotheque" element={
            <PrivateRoute>
              <Bibliotheque />
            </PrivateRoute>
          } />
          <Route path="profil" element={
            <PrivateRoute>
              <ProfilUtilisateur />
            </PrivateRoute>
          } />
          <Route path="ressources/:type" element={
            <PrivateRoute>
              <Ressources />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
