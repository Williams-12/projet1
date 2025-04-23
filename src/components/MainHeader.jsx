import { Link } from 'react-router-dom';

function MainHeader() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logoLink}>
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            style={styles.logo}
          />
        </Link>
      </div>

      <ul style={styles.navLinks}>
        {["ACCUEIL", "BIBLIOTHEQUE", "PROFIL","APropos", "CONTACT"].map((text, index) => (
          <li key={index}>
            <Link to={`/${text.toLowerCase()}`} style={styles.link} onMouseOver={(e) => hoverEffect(e)} onMouseOut={(e) => resetEffect(e)}>
              {text}
            </Link>
          </li>
        ))}
        <li>
          <button
            style={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#dc3545"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            DÉCONNEXION
          </button>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    background: '#fff',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    width: '1000px',
    height: '50px',
    marginLeft: '-400px',
    marginRight: '-150px',
    objectFit: 'contain',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
  
  },
  // brandText: {
  //   marginLeft: '10px',
  //   fontSize: '1.5rem',
  //   fontWeight: 'bold',
  //   color: '#0d6efd',
  //   letterSpacing: '1px',
  // },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    fontWeight: 600,
    color: '#facd05',
    padding: '8px 10px',
    textTransform: 'uppercase',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  logoutBtn: {
    border: '2px solid #dc3545',
    backgroundColor: 'transparent',
    color: '#dc3545',
    fontWeight: 'bold',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
  },
};

function hoverEffect(e) {
  e.currentTarget.style.color = "#0d6efd";
  e.currentTarget.style.transform = "scale(1.05)";
}

function resetEffect(e) {
  e.currentTarget.style.color = "#333";
  e.currentTarget.style.transform = "scale(1)";
}

export default MainHeader;
