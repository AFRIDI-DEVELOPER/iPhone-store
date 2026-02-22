# Supabase Quick Reference

Quick commands and snippets for working with Supabase in the ANAS iPhone Shop.

## Environment Variables

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## SQL Migrations

### Run migrations in order:
1. `001_initial_schema.sql` - Creates tables, RLS policies, triggers
2. `002_seed_data.sql` - Populates with sample products (optional)

## Storage Bucket Setup

**Bucket Name:** `product-images`
**Public:** Yes
**File Types:** image/jpeg, image/png, image/webp
**Max Size:** 5MB

## Creating an Admin User

1. Sign up through the app
2. Go to Supabase → Authentication → Users
3. Copy your user ID
4. Go to Table Editor → profiles
5. Update your profile: set `role = 'admin'`

Or run this SQL (replace USER_ID):

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'USER_ID';
```

## Useful SQL Queries

### Check all users and their roles
```sql
SELECT 
    p.id,
    p.phone,
    p.email,
    p.role,
    p.created_at
FROM profiles p
ORDER BY p.created_at DESC;
```

### List all products
```sql
SELECT 
    id,
    name,
    model,
    price,
    condition,
    in_stock,
    is_featured
FROM products
ORDER BY created_at DESC;
```

### Count products by model
```sql
SELECT 
    model,
    COUNT(*) as count,
    AVG(price) as avg_price
FROM products
GROUP BY model
ORDER BY count DESC;
```

### Find featured products
```sql
SELECT name, model, price, is_featured
FROM products
WHERE is_featured = true;
```

### Update product stock status
```sql
UPDATE products
SET in_stock = false
WHERE id = 123;
```

## Storage Policies (SQL)

### Public read access
```sql
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');
```

### Admin upload
```sql
CREATE POLICY "Admin users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'product-images' 
    AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

### Admin delete
```sql
CREATE POLICY "Admin users can delete"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'product-images'
    AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);
```

## JavaScript Usage Examples

### Upload product image
```javascript
import { uploadProductImage } from './services/storageService';

const handleImageUpload = async (file) => {
    try {
        const imageUrl = await uploadProductImage(file);
        console.log('Image uploaded:', imageUrl);
    } catch (error) {
        console.error('Upload failed:', error);
    }
};
```

### Create product
```javascript
import { createProduct } from './services/productService';

const newProduct = {
    name: 'iPhone 15 Pro',
    model: 'iPhone 15 Pro',
    storage: '256GB',
    color: 'Titanium',
    batteryHealth: '100%',
    price: 124900,
    condition: 'New',
    image: imageUrl,
    description: 'Amazing phone',
    specs: ['6.1" Display', 'A17 Pro'],
    inStock: true,
    isFeatured: false
};

const product = await createProduct(newProduct);
```

### Get products with filters
```javascript
import { getProducts } from './services/productService';

const products = await getProducts({
    model: 'iPhone 15 Pro',
    condition: 'New',
    minPrice: 50000,
    maxPrice: 150000,
    search: 'titanium'
});
```

## Troubleshooting

### Check if Supabase is configured
```javascript
import { isSupabaseConfigured } from './lib/supabaseClient';

if (isSupabaseConfigured()) {
    console.log('✅ Supabase is configured');
} else {
    console.log('❌ Supabase not configured - using fallback');
}
```

### View current session
```javascript
import { supabase } from './lib/supabaseClient';

const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);
```

### Check user role
```javascript
import { useAuth } from './context/AuthContext';

const { user, isAdmin } = useAuth();
console.log('User:', user);
console.log('Is Admin:', isAdmin);
```

## Common Issues

### RLS Policy Errors
If you get "new row violates row-level security policy":
- Check if user is authenticated
- Verify user has correct role (admin for product operations)
- Review RLS policies in Supabase dashboard

### Storage Upload Fails
- Verify bucket exists and is public
- Check storage policies allow the operation
- Ensure file size is under limit (5MB)
- Check file type is allowed (jpeg, png, webp)

### Products Not Showing
- Verify RLS policy allows public SELECT
- Check products exist in database
- Look for JavaScript errors in console
- Verify Supabase credentials are correct

## Links

- **Supabase Dashboard:** https://app.supabase.com
- **Project Settings:** Settings → API
- **SQL Editor:** SQL Editor in sidebar
- **Table Editor:** Table Editor in sidebar
- **Storage:** Storage in sidebar
- **Auth Logs:** Authentication → Logs
