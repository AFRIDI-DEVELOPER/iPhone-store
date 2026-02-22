import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const galleryRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    // Handle scroll to update active dot
    const handleGalleryScroll = () => {
        if (galleryRef.current) {
            const scrollLeft = galleryRef.current.scrollLeft;
            const imageWidth = galleryRef.current.offsetWidth;
            const newIndex = Math.round(scrollLeft / imageWidth);
            setActiveImageIndex(newIndex);
        }
    };

    // Handle dot click to scroll to image
    const handleDotClick = (index) => {
        if (galleryRef.current) {
            const imageWidth = galleryRef.current.offsetWidth;
            galleryRef.current.scrollTo({
                left: index * imageWidth,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div className="product-details-loading">
                <div className="spinner spinner-lg"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
            </div>
        );
    }

    // Generate product images array (using main image and variations)
    const productImages = product.images && product.images.length > 0
        ? product.images
        : [product.image, product.image, product.image, product.image, product.image];

    return (
        <section className="product-details-section">
            <div className="container">
                <Link to="/shop" className="back-link">
                    ← Back to Shop
                </Link>

                <div className="product-details-grid">
                    {/* Image Gallery - Horizontal Scroll */}
                    <div className="gallery-wrapper">
                        <div
                            className="product-gallery"
                            ref={galleryRef}
                            onScroll={handleGalleryScroll}
                        >
                            <div className="main-image-container">
                                {productImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="main-image"
                                        onError={(e) => {
                                            e.target.src = '/iphones/iphone-15.png'; // Reliable fallback
                                            e.target.onerror = null;
                                        }}
                                    />
                                ))}
                                {product.condition !== 'New' && (
                                    <span className="condition-badge">{product.condition}</span>
                                )}
                            </div>
                        </div>
                        {/* Dot Indicators */}
                        <div className="gallery-dots">
                            {productImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`gallery-dot ${activeImageIndex === index ? 'active' : ''}`}
                                    onClick={() => handleDotClick(index)}
                                    aria-label={`View image ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Contact for Purchase Button - Call directly */}
                        <a
                            href="tel:+919671016500"
                            className="whatsapp-glass-btn"
                        >
                            <span className="whatsapp-icon">📞</span>
                            <span>Contact for Purchase</span>
                        </a>
                    </div>

                    {/* Product Info */}
                    <div className="product-info-panel">
                        <h1 className="product-title">{product.name}</h1>

                        {/* Category Badge */}
                        <div className="product-category">
                            <span className={`category-badge ${product.condition?.toLowerCase().replace(' ', '-')}`}>
                                {product.condition || 'New'}
                            </span>
                        </div>

                        {/* Price Section */}
                        <div className="price-section">
                            <span className="current-price">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                    <span className="discount-badge">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Offer Banner */}
                        {product.originalPrice && (
                            <div className="offer-banner">
                                <span className="offer-icon">🎉</span>
                                <span>Special Offer: Save {formatPrice(product.originalPrice - product.price)}!</span>
                            </div>
                        )}

                        {/* Product Specifications */}
                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="spec-label">Storage</span>
                                <span className="spec-value">{product.storage}</span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Color</span>
                                <span className="spec-value">{product.color}</span>
                            </div>
                            {product.batteryHealth && (
                                <div className="spec-item battery">
                                    <span className="spec-label">Battery Health</span>
                                    <span className="spec-value">
                                        <span className="battery-icon">🔋</span>
                                        {product.batteryHealth}
                                    </span>
                                </div>
                            )}
                            <div className="spec-item">
                                <span className="spec-label">Category</span>
                                <span className="spec-value">{product.condition || 'New'}</span>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="product-description">
                                <h3>Description</h3>
                                <p>{product.description}</p>
                            </div>
                        )}

                        {/* Features */}
                        <div className="product-features">
                            <h3>Included</h3>
                            <ul>
                                <li>✓ Original Box</li>
                                <li>✓ Charging Cable</li>
                                <li>✓ 6 Months Warranty</li>
                                <li>✓ Free Shipping</li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
