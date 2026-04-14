import { Component, input, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductBadgeComponent } from '../../shared/product-badge/product-badge.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [ProductBadgeComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();

  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  readonly inCart = computed(() => this.cartService.isInCart(this.product().id));

  goToDetail(): void {
    this.router.navigate(['/products', this.product().id]);
  }
}
