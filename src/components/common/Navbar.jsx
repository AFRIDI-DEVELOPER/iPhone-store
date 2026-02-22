import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <span className="brand-text">APPLE</span>
                    </Link>

                    <div className="navbar-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/shop" className="nav-link">Shop</Link>
                        <Link to="/about" className="nav-link">About</Link>
                    </div>

                    <div className="navbar-actions">
                        <a href="http://localhost:5174" className="btn btn-primary btn-sm">
                            Admin
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

