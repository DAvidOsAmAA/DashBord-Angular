import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductsResponse } from '../../models/product.interface';

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

  // Add other methods as needed (update, create, etc.)
} 