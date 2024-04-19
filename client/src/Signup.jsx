import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios instead of https
import { useNavigate } from 'react-router-dom';
import './assets/home.css';
import agricultureLogo from './assets/agriculture.jpg';

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setErrorMessage] = useState();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage('*All fields are required');
      return;
    }
    axios.post('http://localhost:3001/register', { name, email, password })
    .then((response) => {
      if (response.data === 'Account already exists') {
        setErrorMessage('Account already exists. Please use a different email.');
      } else {
        console.log(response.data);
        navigate('/login');
      }
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage('Registration failed. Please try again.');
    });
  };

  return (
    <div className="hos">
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
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="sh">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
            />
          </div>
          <div className="sh">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
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
            Register
          </button>
          <div style={{ color: 'red' }}>{message}</div>
        </form>
        <br />
        <p>Already Have an Account</p>
        <Link to='/Login' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
