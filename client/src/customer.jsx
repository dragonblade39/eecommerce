import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/customer.css'; // Import CSS file
import agricultureLogo from './assets/agriculture.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Customer = () => {
    const [approvedProducts, setApprovedProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate(); // Initialize navigate for navigation

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/approvedproducts');
            setApprovedProducts(response.data);
        } catch (error) {
            console.error('Error fetching approved products:', error);
        }
    };

    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://localhost:3001/decreaseCount', { productId: product._id });
            if (response.status === 200) {
                if (response.data.message === "Product got finished") {
                    alert("Product got finished");
                }
                setCart([...cart, { ...product, count: 1 }]);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert("Error adding product to cart");
        }
    };

    const removeFromCart = async (productId) => {
        const updatedCart = cart.map(item => {
            if (item._id === productId) {
                if (item.count > 0) {
                    item.count -= 1;
                    if (item.count === 0) {
                        // If count becomes zero, remove the item from cart
                        return null;
                    }
                }
            }
            return item;
        }).filter(Boolean); // Remove null entries from the updatedCart
        setCart(updatedCart);
    };

    const viewCart = () => {
        let cartMessage = "Cart Items:\n";
        cart.forEach(item => {
            cartMessage += `${item.productName} - Price: ${item.price} - Count: ${item.count}\n`;
        });
        cartMessage += "\n";
        cartMessage += "Do you want to Buy Now?";
        const buyNow = window.confirm(cartMessage);
        if (buyNow) {
            navigate('/address');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login'); // Navigate to the login page after logout
    };

    return (
        <div>
            <header className="headerStyle">
                <div className="agricultureNameStyle">
                    <img src={agricultureLogo} alt="Agriculture Logo" className="shortIconStyle" />
                    <span>AGRI EVOLVE</span>
                </div>
                <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
                    <li className="nav-item">
                        <Link to="/pdashboard" className="nav-link text-light">
                            Application
                        </Link>
                    </li>
                </ul>
                <button onClick={viewCart}>View Cart</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>
            <div>
                <div className="products-grid">
                    {approvedProducts.map(product => (
                        <div key={product._id} className="product-card">
                            <p>Product name: {product.productName}</p>
                            <p>Product Expiry date: {product.expiryDate}</p>
                            <p>Product Manufacture date: {product.manufactureDate}</p>
                            <p>Product Type: {product.productType}</p>
                            <p>Price: {product.price}</p>
                            <button onClick={() => addToCart(product)}>+</button>
                            <button onClick={() => removeFromCart(product._id)}>-</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Customer;
