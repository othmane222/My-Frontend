import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white' }}>
      <h1>Gestion des Vols</h1>
      <ul style={{ display: 'flex', gap: '15px', listStyle: 'none' }}>
        <li><a href="#features" style={{ color: 'white' }}>Fonctionnalités</a></li>
        <li><a href="#cta" style={{ color: 'white' }}>Inscription</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
