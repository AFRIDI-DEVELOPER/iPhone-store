import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductGrid from '../components/shop/ProductGrid';
import './Shop.css';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const modelFilter = searchParams.get('model') || '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, [modelFilter]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const filters = modelFilter
                ? { search: modelFilter }
                : {};
            const data = await getProducts(filters);
            setProducts(data);
        } catch (err) {
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearFilter = () => {
        setSearchParams({});
    };

    return (
        <div className="shop-page">
            <div className="shop-header">
                <div className="container">
                    <h1 className="shop-title">
                        {modelFilter ? modelFilter : 'Browse Our Collection'}
                    </h1>
                    <p className="shop-subtitle">
                        {modelFilter
                            ? `Showing results for ${modelFilter}`
                            : 'Find your perfect iPhone from our curated selection'}
                    </p>
                    {modelFilter && (
                        <button className="btn-clear-filter" onClick={clearFilter}>
                            ← Show All Products
                        </button>
                    )}
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
                        <ProductGrid products={products} loading={loading} modelFilter={modelFilter} />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Shop;
