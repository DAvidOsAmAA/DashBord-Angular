import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../../../shared/models/respons/categories';
import { Products } from '../../../shared/models/respons/products';
import { Overall } from '../../../shared/models/respons/overAll';
import { Orders } from '../../../shared/models/respons/Orders';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private readonly env: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get<any>(this.env + 'statistics');
  }
  getOverAll(): Observable<Overall> {
    return this.http.get<Overall>(this.env + 'statistics/overall');
  }
  getProducts(): Observable<Products> {
    return this.http.get<Products>(this.env + 'statistics/products');
  }
  getOrders(): Observable<Orders> {
    return this.http.get<Orders>(this.env + 'statistics/orders');
  }
  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(this.env + 'statistics/categories');
  }
}
