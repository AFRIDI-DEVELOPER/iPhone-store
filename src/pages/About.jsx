import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="container">
                    <h1 className="about-title animate-fade-in-up">About ANAS iPhone Shop</h1>
                    <p className="about-lead animate-fade-in-up">
                        Your trusted partner for premium pre-owned and new iPhones
                    </p>
                </div>
            </div>

            <div className="container">
                <section className="about-section">
                    <div className="about-content">
                        <h2>Our Story</h2>
                        <p>
                            Founded with a passion for technology and customer service, ANAS iPhone Shop has become
                            a leading destination for quality iPhones. We specialize in offering new, like-new, and
                            refurbished iPhones that meet the highest standards of quality and performance.
                        </p>
                        <p>
                            Every device in our inventory undergoes a rigorous 50-point quality check to ensure you
                            receive a product that looks and works like new. We believe everyone deserves access to
                            premium technology without breaking the bank.
                        </p>
                    </div>
                </section>

                <section className="about-section">
                    <h2 className="section-title">Why Choose Us</h2>
                    <div className="grid grid-2">
                        <div className="about-feature-card card-glass">
                            <div className="about-feature-icon">✓</div>
                            <h3>Quality Assurance</h3>
                            <p>Every device undergoes comprehensive testing and comes with detailed quality reports.</p>
                        </div>
                        <div className="about-feature-card card-glass">
                            <div className="about-feature-icon">🔒</div>
                            <h3>6-Month Warranty</h3>
                            <p>We stand behind our products with comprehensive warranty coverage on all purchases.</p>
                        </div>
                        <div className="about-feature-card card-glass">
                            <div className="about-feature-icon">⚡</div>
                            <h3>Fast Shipping</h3>
                            <p>Free 2-day delivery on all orders with secure packaging and tracking.</p>
                        </div>
                        <div className="about-feature-card card-glass">
                            <div className="about-feature-icon">💯</div>
                            <h3>Satisfaction Guaranteed</h3>
                            <p>Not happy? Return within 30 days for a full refund, no questions asked.</p>
                        </div>
                    </div>
                </section>

                <section className="about-section">
                    <div className="about-cta card-glass">
                        <h2>Ready to Find Your Perfect iPhone?</h2>
                        <p>Browse our collection of premium devices at unbeatable prices.</p>
                        <a href="/shop" className="btn btn-gradient btn-lg">
                            Start Shopping
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
