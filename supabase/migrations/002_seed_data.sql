-- =====================================================
-- ANAS iPhone Shop - Seed Data
-- =====================================================
-- This script populates the database with initial product data
-- Run this AFTER running 001_initial_schema.sql

-- Insert sample products
INSERT INTO products (name, model, storage, color, battery_health, price, original_price, condition, image, description, specs, in_stock, is_featured)
VALUES
    -- Latest Models (Featured)
    ('iPhone 17 Pro', 'iPhone 17 Pro', '256GB', 'Deep Purple', '100%', 154900, 179900, 'New', '/iphones/iphone-17.png', 'The future of mobile technology with advanced AI features and unparalleled performance.', ARRAY['6.7" Super Retina XDR', 'A18 Bionic Chip', '48MP Triple Camera', 'AI Integration'], true, true),
    
    ('iPhone 16 Pro', 'iPhone 16 Pro', '128GB', 'Gold', '100%', 139900, 159900, 'New', '/iphones/iphone-16.png', 'Elegance meets power. Experience the next level of Pro performance.', ARRAY['6.3" Pro Display', 'A18 Pro Chip', '48MP Camera', 'Action Button'], true, true),
    
    ('iPhone 15 Pro Max', 'iPhone 15 Pro Max', '256GB', 'Natural Titanium', '100%', 134900, 159900, 'New', '/iphone-15-pro-max.png', 'The ultimate iPhone with titanium design, A17 Pro chip, and ProMotion display.', ARRAY['6.7" Super Retina XDR', 'A17 Pro Chip', '48MP Main Camera', '5G'], true, true),
    
    -- Current Models
    ('iPhone 15 Pro', 'iPhone 15 Pro', '128GB', 'Blue Titanium', '100%', 124900, NULL, 'New', '/iphone-15-pro-blue.png', 'Pro performance with titanium design and advanced camera system.', ARRAY['6.1" Super Retina XDR', 'A17 Pro Chip', '48MP Main Camera', '5G'], true, false),
    
    ('iPhone 15', 'iPhone 15', '128GB', 'Pink', '100%', 79900, NULL, 'New', '/iphone-15-pink.png', 'Dynamic Island. 48MP Main camera. All-day battery life.', ARRAY['6.1" Super Retina XDR', 'A16 Bionic Chip', '48MP Camera', '5G'], true, false),
    
    -- Previous Models
    ('iPhone 14', 'iPhone 14', '128GB', 'Midnight', '95%', 89900, 109900, 'Like New', '/iphones/iphone-14.png', 'Dependable performance with a great camera system.', ARRAY['6.1" Super Retina XDR', 'A15 Bionic', '48MP Camera', 'All-day battery'], true, false),
    
    ('iPhone 13', 'iPhone 13', '128GB', 'Green', '92%', 54900, 69900, 'Like New', '/iphones/iphone-13.png', 'The iconic iPhone with a powerful A15 chip.', ARRAY['6.1" Super Retina XDR', 'A15 Bionic', 'Dual Camera', '5G'], true, false),
    
    ('iPhone 12', 'iPhone 12', '64GB', 'Product RED', '89%', 44900, 59900, 'Refurbished', '/iphones/iphone-12.png', 'A great entry into the iPhone ecosystem.', ARRAY['6.1" OLED Display', 'A14 Bionic', 'Dual Camera', 'Night Mode'], true, false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
DECLARE
    product_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO product_count FROM products;
    
    RAISE NOTICE '✅ Seed data inserted successfully!';
    RAISE NOTICE '📦 Total products in database: %', product_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Your store is now ready with sample products!';
END $$;
