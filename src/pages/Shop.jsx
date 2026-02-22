import React from 'react';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import ProductGrid from '../components/shop/ProductGrid';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        model: 'all',
        storage: 'all',
        condition: 'all'
    });

    useEffect(() => {
        loadProducts();
    }, [filters]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts(filters);
            setProducts(data);
        } catch (err) {
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="shop-page">
            <div className="shop-header">
                <div className="container">
                    <h1 className="shop-title">Browse Our Collection</h1>
                    <p className="shop-subtitle">
                        Find your perfect iPhone from our curated selection
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="shop-content">
                    <main className="shop-products full-width">
                        <div className="products-header">
                            <p className="products-count">
                                {loading ? 'Loading...' : `${products.length} products found`}
                            </p>
                        </div>
                        <ProductGrid products={products} loading={loading} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Shop;
