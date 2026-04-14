import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ReactiveFormsModule, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  readonly cartService = inject(CartService);
  readonly paymentService = inject(PaymentService);

  readonly submitted = signal(false);
  readonly errorMessage = signal<string | null>(null);

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

  async placeOrder(): Promise<void> {
    if (this.detailsForm.invalid || this.paymentForm.invalid) {
      this.detailsForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    const { email } = this.detailsForm.value;
    const { cardName, cardNumber, expiry, cvv } = this.paymentForm.value;

    const clientSecret = await this.paymentService.createPaymentIntent({
      amount: this.cartService.total(),
      currency: 'usd',
      email: email!,
    });

    const result = await this.paymentService.confirmPayment(clientSecret, {
      cardName: cardName!,
      cardNumber: cardNumber!,
      expiry: expiry!,
      cvv: cvv!,
    });

    if (result.status === 'success') {
      this.cartService.clear();
      this.submitted.set(true);
    } else {
      this.errorMessage.set(result.message);
    }
  }
}
