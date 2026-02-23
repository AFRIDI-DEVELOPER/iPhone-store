import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, loading, modelFilter }) => {
    if (loading) {
        return (
            <div className="products-loading">
                <div className="spinner spinner-lg"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="products-empty">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {modelFilter ? (
                    <>
                        <h3>Sorry! {modelFilter} is not available now</h3>
                        <p>Please check back later or browse our other iPhones</p>
                    </>
                ) : (
                    <>
                        <h3>No products found</h3>
                        <p>Try adjusting your filters or search criteria</p>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="product-grid grid grid-3">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
