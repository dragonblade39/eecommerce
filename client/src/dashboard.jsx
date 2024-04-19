import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/dashboard.css'; 
import { Link, useNavigate } from 'react-router-dom';
import agricultureLogo from './assets/agriculture.jpg';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [approvedProducts, setApprovedProducts] = useState([]);
    const [rejectedProducts, setRejectedProducts] = useState([]);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            const response = await axios.post('http://localhost:3001/approve', { _id: id });
            const approvedProduct = response.data;
            setApprovedProducts(prevState => [...prevState, approvedProduct]);
            setProducts(prevState => prevState.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error approving product:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.post('http://localhost:3001/reject', { _id: id });
            const rejectedProduct = response.data;
            setRejectedProducts(prevState => [...prevState, rejectedProduct]);
            setProducts(prevState => prevState.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error rejecting product:', error);
        }
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
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>
            <div className="container">
                <div className="products-container">
                    <h2>Products</h2>
                    <ul className="products-list">
                        {products.map(product => (
                            <li key={product._id}>
                                <p>{product.productName}</p>
                                <p>{product.productOwner}</p>
                                <p>{product.expiryDate}</p>
                                <p>{product.manufactureDate}</p>
                                <p>{product.productType}</p>
                                <p>{product.count}</p>
                                <p>{product.price}</p>
                                <button onClick={() => handleApprove(product._id)}>Approve</button>
                                <button className="reject" onClick={() => handleReject(product._id)}>Reject</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="approved-products">
                    <h2>Approved Products</h2>
                    <ul className="products-list">
                        {approvedProducts.map(product => (
                            <li key={product._id}>
                                <p>{product.productName}</p>
                                <p>{product.productOwner}</p>
                                <p>{product.expiryDate}</p>
                                <p>{product.manufactureDate}</p>
                                <p>{product.productType}</p>
                                <p>{product.count}</p>
                                <p>{product.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rejected-products">
                    <h2>Rejected Products</h2>
                    <ul className="products-list">
                        {rejectedProducts.map(product => (
                            <li key={product._id}>
                                <p>{product.productName}</p>
                                <p>{product.productOwner}</p>
                                <p>{product.expiryDate}</p>
                                <p>{product.manufactureDate}</p>
                                <p>{product.productType}</p>
                                <p>{product.count}</p>
                                <p>{product.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
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

export default Dashboard;
