import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddProduct, Product, ProductsResponse, UpdateProduct } from '../../models/product.interface';
import { OccasionResponse } from '../../models/occasion';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/products`);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(id: string, product: UpdateProduct): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }

  addProduct(product: AddProduct): Observable<any> {
    const formData = this.buildFormData(product);
    return this.http.post(this.apiUrl, formData);
  }

  updateProductRate(id: string, product: UpdateProduct): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}/rate`, product);
  }

  getOccasions(): Observable<OccasionResponse> {
    return this.http.get<OccasionResponse>(`${this.apiUrl}/occasions`);
  }

  private buildFormData(product: AddProduct): FormData {
    const formData = new FormData();

    const fields: Record<keyof Omit<AddProduct, 'imgCover' | 'images'>, string> = {
      title: product.title,
      description: product.description,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      discount: product.discount.toString(),
      priceAfterDiscount: product.priceAfterDiscount.toString(),
      category: product.category,
      occasion: product.occasion,
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('imgCover', product.imgCover);

    product.images.forEach(image => {
      formData.append('images', image);
    });

    return formData;
  }

  // Add other methods as needed (update, create, etc.)
} 