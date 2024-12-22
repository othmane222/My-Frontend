import React from 'react';
import { Carousel } from 'react-bootstrap'; // Bootstrap Carousel component

const ExploreWorld = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Explore the World</h2>
      <Carousel>
        <Carousel.Item interval={2000}> {/* Automatically move every 2 seconds */}
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Paris"
            alt="Paris"
          />
          <Carousel.Caption>
            <h3>Paris</h3>
            <p>The City of Light</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Tokyo"
            alt="Tokyo"
          />
          <Carousel.Caption>
            <h3>Tokyo</h3>
            <p>The Capital of Japan</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=New+York"
            alt="New York"
          />
          <Carousel.Caption>
            <h3>New York</h3>
            <p>The City That Never Sleeps</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=London"
            alt="London"
          />
          <Carousel.Caption>
            <h3>London</h3>
            <p>The Heart of Culture and History</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ExploreWorld;
