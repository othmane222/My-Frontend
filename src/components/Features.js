import React from 'react';

const Features = () => {
  const features = [
    'Gestion complète des réservations',
    'Mise à jour en temps réel des vols',
    'Support client 24/7',
  ];

  return (
    <section id="features" style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Nos Fonctionnalités</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {features.map((feature, index) => (
          <li key={index} style={{ margin: '10px 0', fontSize: '18px' }}>
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
