import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  remove(productId: number): void {
    this.cartService.remove(productId);
  }

  checkout(): void {
    // placeholder for checkout flow
    alert('Checkout coming soon!');
  }
}
