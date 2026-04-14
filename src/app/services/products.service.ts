import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { MOCK_PRODUCTS } from '../mocks/products.mock';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly _products = signal<Product[]>(MOCK_PRODUCTS);

  readonly products = this._products.asReadonly();

  readonly categories = computed<string[]>(() => [
    'All',
    ...Array.from(new Set(this._products().map((p) => p.category))),
  ]);

  getByCategory(category: string): Product[] {
    if (category === 'All') return this._products();
    return this._products().filter((p) => p.category === category);
  }
}
