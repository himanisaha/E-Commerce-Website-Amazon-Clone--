import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <small>© {new Date().getFullYear()} Amazon Clone – Built with React & Vite</small>
    </footer>
  );
}

export default Footer;
