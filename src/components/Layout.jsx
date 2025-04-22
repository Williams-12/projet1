import React from 'react';
import MainHeader from './MainHeader';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MainHeader />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
