export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  previewUrl: string;
  badge?: string;
  description?: string;
  features?: string[];
  gallery?: string[];
  format?: string;
  dimensions?: string;
}
