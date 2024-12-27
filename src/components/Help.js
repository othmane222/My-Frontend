import React from 'react';
import './Help.css'; // Import the styling

const Help = () => {
  const links = [
    { text: 'Terms of Use', url: '/terms-of-use' },
    { text: 'General terms & conditions of carriage', url: '/general-terms' },
    { text: 'Privacy Policy', url: '/privacy-policy' },
    { text: 'Cookies', url: '/cookies' },
    { text: 'Contact us', url: '/contact-us' },
    { text: 'Cookie Preferences', url: '/cookie-preferences' },
  ];

  return (
    <div className="help-container">
      <h2 className="help-title">Help</h2>
      <ul className="help-list">
        {links.map((link, index) => (
          <li key={index} className="help-item">
            <a href={link.url} className="help-link">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Help;
