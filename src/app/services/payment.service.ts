import { Injectable, signal } from '@angular/core';

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface PaymentIntent {
  amount: number;
  currency: string;
  email: string;
}

export interface PaymentResult {
  status: 'success' | 'error';
  message: string;
  intentId?: string;
}

/**
 * Mock payment service — mirrors the Stripe PaymentIntents flow.
 * When integrating Stripe, replace `confirmPayment()` with:
 *   stripe.confirmCardPayment(clientSecret, { payment_method: { card } })
 */
@Injectable({ providedIn: 'root' })
export class PaymentService {
  readonly status = signal<PaymentStatus>('idle');

  async createPaymentIntent(intent: PaymentIntent): Promise<string> {
    // TODO: call your backend POST /create-payment-intent
    // returns { clientSecret: string }
    await this.delay(400);
    return `mock_pi_${Math.random().toString(36).slice(2)}_secret`;
  }

  async confirmPayment(clientSecret: string, cardDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
  }): Promise<PaymentResult> {
    this.status.set('processing');

    // TODO: replace with stripe.confirmCardPayment(clientSecret, { payment_method: { card: stripeCardElement } })
    await this.delay(1800);

    // Simulate decline for test card 4000000000000002
    if (cardDetails.cardNumber.replace(/\s/g, '') === '4000000000000002') {
      this.status.set('error');
      return { status: 'error', message: 'Your card was declined.' };
    }

    this.status.set('success');
    return {
      status: 'success',
      message: 'Payment confirmed.',
      intentId: clientSecret.split('_secret')[0],
    };
  }

  reset(): void {
    this.status.set('idle');
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
