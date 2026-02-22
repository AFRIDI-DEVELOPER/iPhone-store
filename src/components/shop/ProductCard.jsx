import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="product-card card hover-lift">
            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/iphones/iphone-15.png'; // Reliable fallback
                        e.target.onerror = null; // Prevent infinite loop
                    }}
                />
                {product.condition !== 'New' && (
                    <span className="product-badge badge">{product.condition}</span>
                )}
                {product.originalPrice && (
                    <span className="product-discount badge badge-success">
                        Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                <div className="product-specs">
                    <span className="spec-badge">{product.storage}</span>
                    <span className="spec-badge">{product.color}</span>
                    {product.batteryHealth && (
                        <span className="spec-badge spec-battery">🔋 {product.batteryHealth}</span>
                    )}
                </div>

                <div className="product-price-row">
                    <div className="product-pricing">
                        <span className="product-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                            <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
                        )}
                    </div>
                </div>

                <Link
                    to={`/product/${product.id}`}
                    className="btn btn-gradient"
                    style={{ width: '100%', marginTop: '1rem', textAlign: 'center', display: 'block' }}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;

