import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './assets/home.css';
import agricultureLogo from './assets/agriculture.jpg';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
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

  const handleLogin = () => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('adminToken', 'valid');
      navigate('/dashboard');
    } else {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='hos'>
      <header className="navbar navbar-expand-lg navbar-light px-2" style={headerStyle}>
        <div style={agricultureNameStyle}>
          <img src={agricultureLogo} alt="Hospital Logo" style={shortIconStyle} />
          <span>AGRI EVOLVE</span>
        </div>
        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
          <li className="nav-item">
            <Link to="/appointment" className="nav-link text-light">
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
      <div className="container">
        <h2>ADMIN</h2>
        <form onSubmit={handleLogin}>
          <div className="sh">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0 "
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
            />
          </div>
          <div className="sh">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
            />
          </div>
          <button type="submit" className="manage">
            Submit
            <p>{message}</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;