import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-badge',
  templateUrl: './product-badge.component.html',
  styleUrl: './product-badge.component.scss',
})
export class ProductBadgeComponent {
  type = input.required<'New' | 'Bestseller'>();
}
