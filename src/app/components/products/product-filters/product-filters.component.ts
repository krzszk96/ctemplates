import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
})
export class ProductFiltersComponent {
  categories = input.required<string[]>();
  activeCategory = input.required<string>();
  categoryChange = output<string>();

  select(cat: string): void {
    this.categoryChange.emit(cat);
  }
}
