import React from 'react';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#445E75', // Midnight Haze
        color: '#F1EFE5', // Alabaster
      }}
    >
      <div className="container">
        {/* Company Name */}
        <a
          className="navbar-brand"
          href="#"
          style={{
            color: '#F1EFE5', // Alabaster
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          MyCompany
        </a>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: '#F1EFE5' }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundColor: '#F1EFE5', // Alabaster
              borderRadius: '50%',
              display: 'block',
              width: '20px',
              height: '20px',
            }}
          ></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{
                  color: '#F1EFE5', // Alabaster
                  fontWeight: '500',
                }}
              >
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{
                  color: '#F1EFE5', // Alabaster
                  fontWeight: '500',
                }}
              >
                Help
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{
                  color: '#F1EFE5', // Alabaster
                  fontWeight: '500',
                }}
              >
                Language
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn"
                href="#"
                style={{
                  backgroundColor: '#F1EFE5', // Alabaster
                  color: '#445E75', // Midnight Haze
                  fontWeight: '500',
                  padding: '5px 20px',
                  borderRadius: '5px',
                }}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
