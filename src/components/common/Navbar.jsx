import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar glass">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand" onClick={closeMenu}>
                        <span className="brand-text">APPLE</span>
                    </Link>

                    <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
                        <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`} onClick={closeMenu}>Shop</Link>
                        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>About</Link>
                    </div>

                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Backdrop overlay when menu is open */}
            {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}
        </nav>
    );
};

export default Navbar;
