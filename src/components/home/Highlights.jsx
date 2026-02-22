import React from 'react';
import { Link } from 'react-router-dom';
import './Highlights.css';

const Highlights = () => {
    const services = [
        {
            icon: '💳',
            title: 'No Cost EMI',
            description: 'Easy monthly payments with 0% interest on select cards.',
            highlight: true
        },
        {
            icon: '🔄',
            title: 'Exchange Offer',
            description: 'Get up to ₹50,000 on your old smartphone towards a new iPhone.',
            link: '/shop',
            linkText: 'Check your device →'
        },
        {
            icon: '✅',
            title: 'Quality Certified',
            description: 'Every device undergoes a rigorous 50-point inspection.',
        },
        {
            icon: '🛡️',
            title: '6-Month Warranty',
            description: 'Comprehensive coverage on all purchases. Shop with confidence.',
        }
    ];

    return (
        <section className="highlights-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="title-highlight">The ANAS difference.</span>
                        <span className="title-sub">Even more ways to save.</span>
                    </h2>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`service-card ${service.highlight ? 'service-card-highlight' : ''}`}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            {service.link && (
                                <Link to={service.link} className="service-link">
                                    {service.linkText}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Highlights;
