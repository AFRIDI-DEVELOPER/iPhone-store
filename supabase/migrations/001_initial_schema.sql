-- =====================================================
-- ANAS iPhone Shop - Initial Database Schema
-- =====================================================
-- This migration creates the core tables and security policies
-- for the iPhone store application.

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- =====================================================
-- Stores user profile information with role-based access

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone TEXT UNIQUE,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_phone_idx ON profiles(phone);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Allow public to read profiles (for displaying user info)
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Users can create their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
-- Stores iPhone product listings

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    storage TEXT NOT NULL,
    color TEXT NOT NULL,
    battery_health TEXT NOT NULL DEFAULT '100%',
    price INTEGER NOT NULL CHECK (price > 0),
    original_price INTEGER CHECK (original_price IS NULL OR original_price > 0),
    condition TEXT NOT NULL DEFAULT 'New' CHECK (condition IN ('New', 'Like New', 'Refurbished', 'Used')),
    image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    specs TEXT[] DEFAULT '{}',
    in_stock BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS products_model_idx ON products(model);
CREATE INDEX IF NOT EXISTS products_condition_idx ON products(condition);
CREATE INDEX IF NOT EXISTS products_in_stock_idx ON products(in_stock);
CREATE INDEX IF NOT EXISTS products_is_featured_idx ON products(is_featured);
CREATE INDEX IF NOT EXISTS products_created_at_idx ON products(created_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products table
-- Allow everyone to read products
CREATE POLICY "Products are viewable by everyone"
    ON products FOR SELECT
    USING (true);

-- Only admins can insert products
CREATE POLICY "Only admins can insert products"
    ON products FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Only admins can update products
CREATE POLICY "Only admins can update products"
    ON products FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Only admins can delete products
CREATE POLICY "Only admins can delete products"
    ON products FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- =====================================================
-- TRIGGERS
-- =====================================================
-- Automatically update updated_at timestamp

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for products table
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA (Optional)
-- =====================================================
-- You can uncomment this section to seed some initial products

/*
INSERT INTO products (name, model, storage, color, battery_health, price, original_price, condition, image, description, specs, in_stock, is_featured)
VALUES
    ('iPhone 15 Pro Max', 'iPhone 15 Pro Max', '256GB', 'Natural Titanium', '100%', 134900, 159900, 'New', '/iphone-15-pro-max.png', 'The ultimate iPhone with titanium design, A17 Pro chip, and ProMotion display.', ARRAY['6.7" Super Retina XDR', 'A17 Pro Chip', '48MP Main Camera', '5G'], true, true),
    ('iPhone 15 Pro', 'iPhone 15 Pro', '128GB', 'Blue Titanium', '100%', 124900, NULL, 'New', '/iphone-15-pro-blue.png', 'Pro performance with titanium design and advanced camera system.', ARRAY['6.1" Super Retina XDR', 'A17 Pro Chip', '48MP Main Camera', '5G'], true, true),
    ('iPhone 15', 'iPhone 15', '128GB', 'Pink', '100%', 79900, NULL, 'New', '/iphone-15-pink.png', 'Dynamic Island. 48MP Main camera. All-day battery life.', ARRAY['6.1" Super Retina XDR', 'A16 Bionic Chip', '48MP Camera', '5G'], true, true);
*/

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
-- If you see this message, the migration was successful!

DO $$
BEGIN
    RAISE NOTICE '✅ Database schema created successfully!';
    RAISE NOTICE '📋 Tables created: profiles, products';
    RAISE NOTICE '🔒 Row Level Security enabled on all tables';
    RAISE NOTICE '⚡ Indexes and triggers configured';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Create a storage bucket named "product-images"';
    RAISE NOTICE '2. Make the bucket public';
    RAISE NOTICE '3. Configure storage policies (see SUPABASE_SETUP.md)';
    RAISE NOTICE '4. Create your first admin user';
END $$;
