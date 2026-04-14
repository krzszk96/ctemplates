import { Component, signal, computed, inject } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);

  readonly categories = this.productsService.categories;
  readonly activeCategory = signal<string>('All');

  readonly filteredProducts = computed<Product[]>(() =>
    this.productsService.getByCategory(this.activeCategory()),
  );

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }
}
