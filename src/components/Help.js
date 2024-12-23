import React from 'react';

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
    <div className="container my-5">
      <h2 className="text-center mb-4">Help</h2>
      <ul className="list-group">
        {links.map((link, index) => (
          <li key={index} className="list-group-item">
            <a href={link.url} style={{ textDecoration: 'none', color: '#445E75' }}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Help;
