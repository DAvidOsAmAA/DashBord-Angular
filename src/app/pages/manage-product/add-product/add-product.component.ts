import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { AddProduct } from '../../../core/models/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Occasion } from '../../../core/models/occasion';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { ICategory } from '../../../shared/interfaces/i-category';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  addProductForm: FormGroup;
  private destroy$ = new Subject<void>();
  occasions: Occasion[] = [];
  categories: ICategory[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private _CategoriesService: CategoriesService
  ) {
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [0],
      priceAfterDiscount: [0],
      quantity: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      occasion: ['', Validators.required],
      imgCover: [null, Validators.required],
      images: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.productsService.getOccasions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.occasions = res.occasions;
        }
      });
    this._CategoriesService.getAllGategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.categories = res.categories;
        }
      });
  }

  onFileChange(event: any, field: 'imgCover' | 'images') {
    const files = event.target.files;
    if (field === 'imgCover') {
      this.addProductForm.patchValue({ imgCover: files[0] });
    } else if (field === 'images') {
      this.addProductForm.patchValue({ images: Array.from(files) });
    }
    this.addProductForm.get(field)?.updateValueAndValidity();
  }

  submit() {
    if (this.addProductForm.invalid) return;
    const formValue = this.addProductForm.value;
    // Map category and occasion IDs to names
    const selectedCategory = this.categories.find(cat => cat._id === formValue.category);
    const selectedOccasion = this.occasions.find(occ => occ._id === formValue.occasion);
    const product: AddProduct = {
      ...formValue,
      category: selectedCategory ? selectedCategory.name : '',
      occasion: selectedOccasion ? selectedOccasion.name : '',
      imgCover: formValue.imgCover,
      images: formValue.images
    };
    this.productsService.addProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // handle success (e.g., show message, reset form)
          this.addProductForm.reset();
        },
        error: (err) => {
          // handle error (e.g., show error message)
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
