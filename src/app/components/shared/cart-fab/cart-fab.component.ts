import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-fab',
  imports: [RouterLink],
  templateUrl: './cart-fab.component.html',
  styleUrl: './cart-fab.component.scss',
})
export class CartFabComponent {
  readonly cartService = inject(CartService);
}
