import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);

  readonly product = computed<Product | undefined>(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.productsService.getById(id);
  });

  readonly activeImage = signal<string>('');
  readonly added = signal(false);

  readonly mainImage = computed<string>(() => {
    const p = this.product();
    if (!p) return '';
    return this.activeImage() || p.gallery?.[0] || p.previewUrl;
  });

  selectImage(url: string): void {
    this.activeImage.set(url);
  }

  addToCart(): void {
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
