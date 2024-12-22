import React from 'react';
import { Carousel } from 'react-bootstrap';
import london from '../Assets/a.png';

const ExploreWorld = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Explore the World</h2>
      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Paris"
            alt="Paris"
          />
          <Carousel.Caption>
            <h3>Paris</h3>
            <p>The City of Light and Love.</p>
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
            <p>The City That Never Sleeps.</p>
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
            <p>A city where tradition meets the future.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={london}
            alt="London"
          />
          <Carousel.Caption>
            <h3>London</h3>
            <p>The Heart of Culture and History.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Rome"
            alt="Rome"
          />
          <Carousel.Caption>
            <h3>Rome</h3>
            <p>The Eternal City, rich in history.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Dubai"
            alt="Dubai"
          />
          <Carousel.Caption>
            <h3>Dubai</h3>
            <p>Where luxury meets innovation.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Sydney"
            alt="Sydney"
          />
          <Carousel.Caption>
            <h3>Sydney</h3>
            <p>Australia's Harbour City.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Cape+Town"
            alt="Cape Town"
          />
          <Carousel.Caption>
            <h3>Cape Town</h3>
            <p>The Jewel of South Africa.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Bangkok"
            alt="Bangkok"
          />
          <Carousel.Caption>
            <h3>Bangkok</h3>
            <p>A vibrant city full of life and flavor.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x500?text=Rio+de+Janeiro"
            alt="Rio de Janeiro"
          />
          <Carousel.Caption>
            <h3>Rio de Janeiro</h3>
            <p>The Marvelous City of Brazil.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ExploreWorld;
