import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
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
