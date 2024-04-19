import React, { useState } from 'react';
import axios from 'axios';
import './assets/product.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import agricultureLogo from './assets/agriculture.jpg';

const Pdashboard = () => {
    const [productName, setProductName] = useState('');
    const [productOwner, setProductOwner] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [manufactureDate, setManufactureDate] = useState('');
    const [productType, setProductType] = useState('');
    const [count, setCount] = useState('');
    const [price, setPrice] = useState(''); // Add state variable for price
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/products', {
                productName,
                productOwner,
                expiryDate,
                manufactureDate,
                productType,
                count,
                price // Include price in the POST request
            });
            console.log(response.data);
            setProductName('');
            setProductOwner('');
            setExpiryDate('');
            setManufactureDate('');
            setProductType('');
            setCount('');
            setPrice(''); // Reset price after successful submission
            setShowSuccessMessage(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const SuccessMessage = () => {
        return (
            <div className="success-message">
                <p>Submitted Successfully!</p>
            </div>
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login'); // Navigate to the login page after logout
    };

    return (
        <div>
            <header className="navbar navbar-expand-lg navbar-light justify-content-between px-2" style={headerStyle}>
                <div style={agricultureNameStyle}>
                    <img src={agricultureLogo} alt="Agriculture Logo" style={shortIconStyle} />
                    <span>AGRI EVOLVE</span>
                </div>
                <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                    <li className="nav-item">
                        <Link to="/customer" className="nav-link text-light">
                            Customer
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pdashboard" className="nav-link text-light">
                            Application
                        </Link>
                    </li>
                </ul>
                <button className="logout-btn" onClick={handleLogout}>Logout</button> 
            </header>
            <div className="container">
                <h1>APPLICATION OF PRODUCT</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Product Owner</label>
                        <input type="text" className="form-control" value={productOwner} onChange={(e) => setProductOwner(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="date" className="form-control" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Manufacture Date</label>
                        <input type="date" className="form-control" value={manufactureDate} onChange={(e) => setManufactureDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Product Type</label>
                        <input type="text" className="form-control" value={productType} onChange={(e) => setProductType(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Count</label>
                        <input type="number" className="form-control" value={count} onChange={(e) => setCount(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {showSuccessMessage && <SuccessMessage />}
            </div>
        </div>
    );
};

const headerStyle = {
    backgroundColor: '#00563B',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
};

const agricultureNameStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
};

const shortIconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
};

export default Pdashboard;
