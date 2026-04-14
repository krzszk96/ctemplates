import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  readonly cartService = inject(CartService);
  readonly submitted = signal(false);

  readonly detailsForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  readonly paymentForm = this.fb.group({
    cardName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiry: ['', Validators.required],
    cvv: ['', Validators.required],
  });

  placeOrder(): void {
    if (this.detailsForm.invalid || this.paymentForm.invalid) {
      this.detailsForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    this.cartService.clear();
  }
}
