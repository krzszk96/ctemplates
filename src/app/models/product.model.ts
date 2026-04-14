export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  previewUrl: string;
  badge?: 'New' | 'Bestseller';
  description?: string;
  features?: string[];
  gallery?: string[];
  format?: string;
  dimensions?: string;
}
