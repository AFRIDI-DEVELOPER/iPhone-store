import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_KEY;

console.log('--- Supabase Diagnostic ---');
console.log('URL:', supabaseUrl);
console.log('Anon Key exists:', !!supabaseAnonKey);
console.log('Service Key exists:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

async function checkConnection() {
    try {
        console.log('Testing connection to "products" table...');
        const { data, error, count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Error fetching products:', error);
            if (error.code === 'PGRST116') {
                console.log('ℹ️ Table "products" exists but is empty or has RLS issues.');
            } else if (error.code === '42P01') {
                console.error('❌ Table "products" DOES NOT EXIST.');
            }
        } else {
            console.log('✅ Connection successful. Product count:', count);
        }

        console.log('Testing storage bucket "product-images"...');
        const { data: bucket, error: bucketError } = await supabase.storage.getBucket('product-images');
        if (bucketError) {
            console.error('❌ Bucket "product-images" error:', bucketError.message);
        } else {
            console.log('✅ Bucket "product-images" exists.');
        }

    } catch (err) {
        console.error('💥 Connection failed:', err.message);
    }
}

checkConnection();
