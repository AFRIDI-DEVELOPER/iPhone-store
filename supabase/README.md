# Supabase Integration

This directory contains all the files needed to set up Supabase as the backend for the ANAS iPhone Shop.

## 📁 Files

- **`SUPABASE_SETUP.md`** - Comprehensive step-by-step setup guide (start here!)
- **`QUICK_REFERENCE.md`** - Quick reference for common tasks and queries
- **`migrations/`** - SQL migration files for database setup
  - `001_initial_schema.sql` - Creates tables, RLS policies, and triggers
  - `002_seed_data.sql` - Populates database with sample products (optional)

## 🚀 Quick Start

1. **Read the setup guide**: Open `SUPABASE_SETUP.md` and follow the steps
2. **Create Supabase project**: Sign up at [supabase.com](https://supabase.com)
3. **Run migrations**: Copy and run the SQL files in the Supabase SQL Editor
4. **Configure environment**: Create `.env` file with your credentials
5. **Create admin user**: Sign up and promote yourself to admin
6. **Start building**: Run `npm run dev` and start managing products!

## 📚 What You'll Set Up

- ✅ **Authentication** - Phone/Email login with OTP
- ✅ **User Profiles** - Role-based access (user/admin)
- ✅ **Product Management** - CRUD operations for iPhone listings
- ✅ **Image Storage** - Upload and manage product images
- ✅ **Security** - Row Level Security policies

## 🔗 Quick Links

- [Supabase Dashboard](https://app.supabase.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Setup Guide](./SUPABASE_SETUP.md)
- [Quick Reference](./QUICK_REFERENCE.md)

## 💡 Need Help?

Check the troubleshooting section in `SUPABASE_SETUP.md` or the common issues in `QUICK_REFERENCE.md`.
