import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Accueil from './pages/Accueil';
import Contact from './pages/Contact';
import Bibliotheque from './pages/Bibliotheque';
import ProfilUtilisateur from './pages/ProfilUtilisateur';
import Login from './Pages/Login';
import Register from './Pages/Register';
import APropos from './pages/APropos';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bibliotheque" element={<Bibliotheque />} />
          <Route path="/ProfilUtilisateur" element={<ProfilUtilisateur />} />
          <Route path="/apropos" element={<APropos />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;