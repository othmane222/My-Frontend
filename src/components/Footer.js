import React from 'react';
import '../Styles/Footer.css'; // Optional for additional styling

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Left Section: Payment Methods */}
          <div className="col-md-4 d-flex align-items-center">
            <span className="me-2">Accepted Payment Methods:</span>
            <img src="https://via.placeholder.com/50?text=Visa" alt="Visa" className="me-2" />
            <img src="https://via.placeholder.com/50?text=MasterCard" alt="MasterCard" className="me-2" />
            <img src="https://via.placeholder.com/50?text=PayPal" alt="PayPal" className="me-2" />
            <img src="https://via.placeholder.com/50?text=Amex" alt="Amex" className="me-2" />
            <img src="https://via.placeholder.com/50?text=Discover" alt="Discover" className="me-2" />
            <img src="https://via.placeholder.com/50?text=UnionPay" alt="UnionPay" />
          </div>

          {/* Center Section: Terms and Policies */}
          <div className="col-md-4 text-center">
            <p>2024 ©  All rights reserved.</p>
            <p>
              A card payment processing fee may be applied to your booking. This fee will be reflected in the total price
              once the card number has been entered. Please see our GTCC for more details.
            </p>
          </div>

          {/* Right Section: Links */}
          <div className="col-md-4 text-md-end">
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-light text-decoration-none">
                  General terms & conditions of carriage
                </a>
              </li>
              <li>
                <a href="#!" className="text-light text-decoration-none">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#!" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#!" className="text-light text-decoration-none">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#!" className="text-light text-decoration-none">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#!" className="text-light text-decoration-none">
                  Cookie preferences
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
