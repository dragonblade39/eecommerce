import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './home';
import Admin from './admin';
import Pdashboard from './pdashboard';
import Dashboard from './dashboard';
import Customer from './customer';
import Address from './address';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pdashboard" element={<Pdashboard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/address" element={<Address/>}/>
      </Routes>
    </Router>
  );
}

export default App;
