export type AgeGroup = '3-5' | '6-8' | '9+' | 'all' | 'parents';

export type Category = 
  | 'ebooks' 
  | 'printables' 
  | 'audio' 
  | 'educational' 
  | 'planners';

export type ProductFormat = 
  | 'PDF Download' 
  | 'Audio MP3' 
  | 'Craft Pack' 
  | 'Printable Kit' 
  | 'EPUB / eBook'
  | 'Printable Sheet';

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  currency: string;
  category: Category;
  format: ProductFormat | string;
  age_group: AgeGroup;
  pages_or_duration?: string;
  pages_count?: number;
  thumbnail_url: string;
  preview_images: string[];
  storage_file_path: string;
  is_featured: boolean;
  is_freebie?: boolean;
  is_dulo_toons?: boolean;
  tags?: string[];
  audio_sample_url?: string;
  rating?: number;
  reviews_count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
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
