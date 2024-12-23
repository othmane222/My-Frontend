import React from 'react';
import '../Styles/UsefulLinks.css';

const UsefulLinks = () => {
  return (
    <div className="useful-links bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">Useful Links</h2>
        <div className="row">
          <div className="col-md-3">
            <h5>Help Centre</h5>
            <ul className="list-unstyled">
              <li>Flight info</li>
              <li>Airports and tourism</li>
              <li>#KRKtravelchallenge</li>
              <li>LEGOLAND® Billund</li>
              <li>Say YES! to Zadar</li>
              <li>Krakow Airport</li>
              <li>Cantabria, a place to share</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Useful Info</h5>
            <ul className="list-unstyled">
              <li>Fees</li>
              <li>Inflight receipts</li>
              <li>Travel Agent Bookings</li>
              <li>Refund Hub</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Corporate</h5>
            <ul className="list-unstyled">
              <li>About us</li>
              <li>Careers</li>
              <li>Investor relations</li>
              <li>Group Travel</li>
              <li>Media centre</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Cheap Flights</h5>
            <ul className="list-unstyled">
              <li>Flights to Amsterdam</li>
              <li>Flights to Lanzarote</li>
              <li>Flights to Malaga</li>
              <li>Flights to Liverpool</li>
              <li>Flights to Paris</li>
              <li>Flights to Alicante</li>
              <li>Flights to Birmingham</li>
              <li>Flights to Tenerife</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <h5>Connect with us</h5>
          <p>Download now</p>
          <div>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                className="store-badge"
              />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Download_on_the_App_Store_Badge_US-UK_RGB_blk.svg/512px-Download_on_the_App_Store_Badge_US-UK_RGB_blk.svg.png"
                alt="App Store"
                className="store-badge"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsefulLinks;
