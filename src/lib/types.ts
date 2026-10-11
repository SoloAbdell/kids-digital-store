export type AgeGroup = '3-5' | '6-8' | '9+' | 'all';
export type Category = 'coloring' | 'crafts' | 'math-letters' | 'stem' | 'bundles';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  age_group: AgeGroup;
  category: Category;
  pages_count: number;
  format: string;
  thumbnail_url: string;
  preview_images: string[];
  storage_file_path: string;
  is_featured: boolean;
  is_freebie?: boolean;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_id: string;
  amount_paid: number;
  currency: string;
  stripe_session_id?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface DownloadToken {
  id: string;
  token: string;
  order_id?: string;
  product_id: string;
  customer_email: string;
  download_count: number;
  max_downloads: number;
  expires_at: string;
  created_at: string;
}
