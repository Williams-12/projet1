import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Accueil from './pages/Accueil';
import Contact from './pages/Contact';
import Bibliotheque from './pages/Bibliotheque';
import ProfilUtilisateur from './pages/ProfilUtilisateur';

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
