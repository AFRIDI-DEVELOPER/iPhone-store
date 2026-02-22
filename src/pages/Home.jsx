import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Highlights from '../components/home/Highlights';
import { useState, useEffect } from 'react';
import { getFeaturedProducts } from '../services/productService';
import ProductCard from '../components/shop/ProductCard';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useScrollAnimation();

    useEffect(() => {
        const loadFeatured = async () => {
            try {
                const products = await getFeaturedProducts();
                setFeaturedProducts(products);
            } catch (err) {
                console.error('Error loading featured products:', err);
            } finally {
                setLoading(false);
            }
        };
        loadFeatured();
    }, []);

    return (
        <div className="home-page">
            <HeroSection />
            <Highlights />

            {/* Featured Products Section */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            <span className="title-highlight">Featured iPhones.</span>
                            <span className="title-sub">Our most popular picks.</span>
                        </h2>
                    </div>

                    {loading ? (
                        <div className="flex-center" style={{ padding: '3rem' }}>
                            <div className="spinner spinner-lg"></div>
                        </div>
                    ) : (
                        <div className="featured-grid">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="featured-item">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="featured-cta">
                        <a href="/shop" className="btn btn-primary btn-lg">
                            View All iPhones
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
