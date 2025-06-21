import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MenuModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    RouterLink
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.loading = true;
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.filteredProducts = [...this.products];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load products'
          });
          this.loading = false;
        }
      });
  }

  filterProducts(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredProducts = this.products.filter(product => 
      product.title.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.price.toString().includes(query)
    );
  }

  onUpdate(product: Product): void {
    console.log('Update product:', product.id);
    // Implement update logic here
  }

  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct(product);
      }
    });
  }

  deleteProduct(product: Product): void {
    this.productsService.deleteProduct(product.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.filteredProducts = this.filteredProducts.filter(p => p.id !== product.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product deleted successfully'
          });
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete product'
          });
        }
      });
  }
} 