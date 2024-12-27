import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: '#F1EFE5',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          MyCompany
        </Link>

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
              backgroundColor: '#F1EFE5',
              borderRadius: '50%',
              display: 'block',
              width: '20px',
              height: '20px',
            }}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/reviews"
                style={{
                  color: '#F1EFE5',
                  fontWeight: '500',
                }}
              >
                Review
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/help"
                style={{
                  color: '#F1EFE5',
                  fontWeight: '500',
                }}
              >
                Help
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/language"
                style={{
                  color: '#F1EFE5',
                  fontWeight: '500',
                }}
              >
                Language
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn"
                to="/signup"
                style={{
                  backgroundColor: '#F1EFE5',
                  color: '#445E75',
                  fontWeight: '500',
                  padding: '5px 20px',
                  borderRadius: '5px',
                }}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
