import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductBadgeComponent } from '../../shared/product-badge/product-badge.component';

@Component({
  selector: 'app-product-card',
  imports: [ProductBadgeComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();

  constructor(private router: Router) {}

  goToDetail(): void {
    this.router.navigate(['/products', this.product().id]);
  }
}
