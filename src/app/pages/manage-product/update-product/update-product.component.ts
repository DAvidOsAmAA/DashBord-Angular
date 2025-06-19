import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { UpdateProduct, Product } from '../../../core/models/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  updateProductForm: FormGroup;
  private destroy$ = new Subject<void>();
  product: Product | null = null;
  productId: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateProductForm = this.fb.group({
      price: [null, [Validators.required, Validators.min(0)]],
      rateAvg: [null, [Validators.required, Validators.min(0), Validators.max(5)]],
      rateCount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if (!this.productId) {
      this.router.navigate(['/products']);
      return;
    }

    this.loadProduct();
  }

  private loadProduct() {
    this.loading = true;
    this.productsService.getProductById(this.productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (product) => {
          this.product = product;
          this.populateForm(product);
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading product:', err);
          this.loading = false;
        }
      });
  }

  private populateForm(product: Product) {
    this.updateProductForm.patchValue({
      price: product.price,
      rateAvg: product.rateAvg,
      rateCount: product.rateCount
    });
  }

  submit() {
    if (this.updateProductForm.invalid) return;

    const formValue = this.updateProductForm.value;
    
    const updateData: UpdateProduct = {
      price: formValue.price,
      rateAvg: formValue.rateAvg,
      rateCount: formValue.rateCount
    };

    this.loading = true;
    this.productsService.updateProduct(this.productId, updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log('Product updated successfully:', res);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.loading = false;
        }
      });
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
