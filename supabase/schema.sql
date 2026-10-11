-- ==============================================================================
-- KIDS DIGITAL STORE - SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'USD',
    age_group TEXT NOT NULL CHECK (age_group IN ('3-5', '6-8', '9+', 'all')),
    category TEXT NOT NULL CHECK (category IN ('coloring', 'crafts', 'math-letters', 'stem', 'bundles')),
    pages_count INTEGER NOT NULL DEFAULT 10,
    format TEXT NOT NULL DEFAULT 'PDF Printable (A4 & US Letter)',
    thumbnail_url TEXT NOT NULL,
    preview_images TEXT[] DEFAULT '{}',
    storage_file_path TEXT NOT NULL, -- Path inside private Supabase storage bucket
    is_featured BOOLEAN DEFAULT FALSE,
    is_freebie BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    amount_paid DECIMAL(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    stripe_session_id TEXT UNIQUE,
    payment_method TEXT DEFAULT 'stripe',
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SECURE TIME-EXPIRING DOWNLOAD TOKENS
CREATE TABLE IF NOT EXISTS public.download_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token TEXT UNIQUE NOT NULL,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    download_count INTEGER DEFAULT 0,
    max_downloads INTEGER DEFAULT 5,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EMAIL LEADS (LEAD MAGNET OPT-IN)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    child_age TEXT,
    source TEXT DEFAULT 'freebie-optin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_age ON public.products(age_group);
CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON public.download_tokens(token);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);

-- Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Public products viewable" ON public.products
    FOR SELECT USING (true);

-- Leads insertable by anyone (public optin)
CREATE POLICY "Public leads insert" ON public.leads
    FOR INSERT WITH CHECK (true);

-- SEED DATA (Ready-to-use sample products)
INSERT INTO public.products (slug, title, description, price, currency, age_group, category, pages_count, thumbnail_url, preview_images, storage_file_path, is_featured)
VALUES 
(
    'safari-animals-coloring-pack',
    'Safari Animals Mega Coloring Pack',
    '35 adorable wild animal coloring pages designed specifically for toddlers and young learners. Thick lines, easy to color, instant fun!',
    5.99,
    'USD',
    '3-5',
    'coloring',
    35,
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80'],
    'products/safari-animals.pdf',
    true
),
(
    'diy-cut-and-paste-dinosaurs',
    'Dino Crafts: Cut, Assemble & Color',
    '20 interactive cut-and-paste dinosaur activity sheets. Boosts fine motor skills, spatial reasoning, and hand-eye coordination.',
    7.49,
    'USD',
    '6-8',
    'crafts',
    20,
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80'],
    'products/dino-cut-paste.pdf',
    true
),
(
    'kindergarten-math-alphabet-workbook',
    'Early Genius: Math & Alphabet Fun Sheets',
    '50 comprehensive worksheets covering number tracing, alphabet adventures, basic additions, and pattern puzzles.',
    8.99,
    'USD',
    '3-5',
    'math-letters',
    50,
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'],
    'products/math-alphabet-workbook.pdf',
    true
),
(
    'little-detective-stem-mazes',
    'Little Detective: STEM Logic Mazes & Puzzles',
    'Engaging logic puzzles, pattern matching, and STEM thinking sheets for curious kids ready for a challenge.',
    6.99,
    'USD',
    '6-8',
    'stem',
    28,
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80'],
    'products/stem-mazes.pdf',
    false
),
(
    'all-in-one-super-activity-bundle',
    'The Ultimate 150+ Page Kids Activity Bundle',
    'Includes Safari Coloring, Dino Crafts, Math Worksheets, and STEM puzzles all in one ultimate money-saving bundle.',
    14.99,
    'USD',
    'all',
    'bundles',
    150,
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    ARRAY['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'],
    'products/mega-bundle.pdf',
    true
)
ON CONFLICT (slug) DO NOTHING;
