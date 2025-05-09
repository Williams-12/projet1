import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'animate.css';
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
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Pages avec Layout (NavBar ou MainHeader selon la route) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="apropos" element={<APropos />} />

          {/* 🔒 Routes protégées */}
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

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;
