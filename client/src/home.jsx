import React from 'react';
import { Link } from 'react-router-dom';
import agricultureLogo from './assets/agriculture.jpg';
import agbg from './assets/agbg.jpg';

const largeIconStyle = {
  width: '80px',
  height: '80px',
  marginRight: '10px',
};
const shortIconStyle = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
};
const agricultureNameStyle = {
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  padding: '0 2px',
};

const headerStyle = {
    backgroundColor: '#00563B',
};

const footerStyle = {
  backgroundColor: '#00563B',
  padding: '20px',
  color: 'white',
};
const bodyStyle = {
  backgroundImage: `url(${agbg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  fontFamily: 'Arial, sans-serif',
};
function Home() {
  return (
    <div style={bodyStyle}>
      <header className="navbar navbar-expand-lg navbar-light px-2" style={headerStyle}>
        <div style={agricultureNameStyle}>
          <img src={agricultureLogo} alt="Agriculture Logo" style={shortIconStyle} />
          <span>AGRI EVOLVE</span>
        </div>
        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
          <li className="nav-item">
            <Link to="/admin" className="nav-link text-light">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link text-light">
              User
            </Link>
          </li>
        </ul>
      </header>
      <div style={{ padding: '20px', color: 'ffffff', height: '600px', marginRight: '150px' }}>
        <h2>Agriculture Information</h2>
        <p>
          Welcome to Agri Evolve. We are committed to providing high-quality services to our customers.
        </p>
        <ul>
            <li>Fertilized and unfertilized seeds for various crops</li>
            <li>State-of-the-art farming equipment and machinery</li>
            <li>Advanced irrigation systems for efficient water management</li>
            <li>High-quality fertilizers and pesticides</li>
            <li>Modern greenhouse structures for controlled environment farming</li>
            <li>Cutting-edge crop monitoring and management software</li>
        </ul>
        <p>
          Your well-being are our top priorities. We look forward to serving you and providing the care you need.
        </p>
      </div>
    </div>
  );
}

export default Home;
