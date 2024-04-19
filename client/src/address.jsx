import React, { useState } from 'react';
import axios from 'axios';
import './assets/Address.css'; // Import the CSS file

const Address = () => {
  const [addressData, setAddressData] = useState({
    houseNumber: '',
    apartmentName: '',
    areaName: '',
    cityName: '',
    stateName: '',
    countryName: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/orders', addressData);
      console.log(response); // Log the response for debugging

      if (response.status === 201) { // Ensure status is 201 for "Created"
        setOrderPlaced(true);
        window.alert('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  console.log(orderPlaced); // Log the orderPlaced state for debugging

  return (
    <div className="address-form">
      <h2>Enter Address</h2>
      <form onSubmit={handleSubmit}>
        <label>
          House Number:
          <input
            type="text"
            name="houseNumber"
            value={addressData.houseNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Apartment Name:
          <input
            type="text"
            name="apartmentName"
            value={addressData.apartmentName}
            onChange={handleChange}
          />
        </label>
        <label>
          Area Name:
          <input
            type="text"
            name="areaName"
            value={addressData.areaName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City Name:
          <input
            type="text"
            name="cityName"
            value={addressData.cityName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State Name:
          <input
            type="text"
            name="stateName"
            value={addressData.stateName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country Name:
          <input
            type="text"
            name="countryName"
            value={addressData.countryName}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
      {orderPlaced && (
        <div className="pop-out">
          <p>Order placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Address;
