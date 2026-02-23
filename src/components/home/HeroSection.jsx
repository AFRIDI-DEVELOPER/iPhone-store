import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    // iPhone category with real images
    // iPhone categories with comprehensive model list
    const categories = [
        // iPhone 17 Series
        { name: 'iPhone 17 Pro Max', image: '/iphones/17promax.jpg', isMax: true },
        { name: 'iPhone 17 Pro', image: '/iphones/17pro.jpg' },
        { name: 'iPhone 17Air', image: '/iphones/17air.jpeg' },

        // iPhone 16 Series
        { name: 'iPhone 16 Pro Max', image: '/iphones/16pro.jpeg', isMax: true },
        { name: 'iPhone 16 Pro', image: '/iphones/16promax.jpeg' },
        { name: 'iPhone 16', image: '/iphones/16.jpeg' },

        // iPhone 15 Series
        { name: 'iPhone 15 Pro Max', image: '/iphones/15promax.jpeg', isMax: true },
        { name: 'iPhone 15 Pro', image: '/iphones/15pro.jpg' },
        { name: 'iPhone 15 Plus', image: '/iphones/15plus.jpeg' },
        { name: 'iPhone 15', image: '/iphones/iphone-15.png' },

        // iPhone 14 Series
        { name: 'iPhone 14 Pro Max', image: '/iphones/14promax.jpeg', isMax: true },
        { name: 'iPhone 14 Pro', image: '/iphones/14pro.png' },
        { name: 'iPhone 14 Plus', image: '/iphones/iphone-15-pink.png' },
        { name: 'iPhone 14', image: '/iphones/14.webp' },

        // iPhone 13 Series
        { name: 'iPhone 13 Pro Max', image: '/iphones/iphone-13.png', isMax: true },
        { name: 'iPhone 13 Pro', image: '/iphones/iphone-13.png' },
        { name: 'iPhone 13 mini', image: '/iphones/iphone-13.png' },
        { name: 'iPhone 13', image: '/iphones/iphone-13.png' },

        // iPhone 12 Series
        { name: 'iPhone 12 Pro Max', image: '/iphones/iphone-12.png', isMax: true },
        { name: 'iPhone 12 Pro', image: '/iphones/iphone-12.png' },
        { name: 'iPhone 12 mini', image: '/iphones/iphone-12.png' },
        { name: 'iPhone 12', image: '/iphones/iphone-12.png' },

        // Additional
        { name: 'iPhone SE', image: '/iphones/se.png' },
        { name: 'Pre-owned', icon: '✨' },
    ];

    return (
        <section className="hero-section">
            <div className="container">
                {/* Main Hero Content */}
                <div className="hero-header">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="title-accent gradient-text">APPLE</span>
                            <span className="title-tagline">
                                The best way to buy the
                                <br />
                                iPhones you love.
                            </span>
                        </h1>
                        <div className="hero-cta">
                            <Link to="/shop" className="hero-link">
                                Shop iPhones →
                            </Link>
                        </div>
                    </div>

                    {/* Hero iPhone Image */}
                    <div className="hero-phone">
                        <div className="phone-rotation-container">
                            <img
                                src="/iphones/orange-iphone.png"
                                alt="iPhone Pro"
                                className="hero-phone-image"
                                fetchPriority="high"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Quick Links */}
                <div className="category-row">
                    {categories.map((cat, index) => (
                        <Link
                            to={`/shop?model=${encodeURIComponent(cat.name)}`}
                            key={index}
                            className="category-item"
                        >
                            <div className="category-icon">
                                {cat.image ? (
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className={`category-phone-img ${cat.isMax ? 'max-device' : ''}`}
                                        loading="lazy"
                                    />
                                ) : (
                                    cat.icon
                                )}
                            </div>
                            <span className="category-name">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
