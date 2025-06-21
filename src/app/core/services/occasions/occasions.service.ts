import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OccasionsService {
  constructor(private readonly httpClient: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAllOccasions(): Observable<any> {
    return this.httpClient.get(
      'https://flower.elevateegy.com/api/v1/occasions'
    );
  }

  addOcasions(data: any): Observable<any> {
    return this.httpClient.post(
      'https://flower.elevateegy.com/api/v1/occasions',
      data,
      {
        headers: {
          token: this.getToken()!,
        },
      }
    );
  }
  getOccasion(id: string): Observable<any> {
    return this.httpClient.get(
      `https://flower.elevateegy.com/api/v1/occasions/${id}`
    );
  }

  deleteOccasion(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://flower.elevateegy.com/api/v1/occasions/${id}`,
      {
        headers: {
          token: this.getToken()!,
        },
      }
    );
  }

  editOccasions(id: string, data: any): Observable<any> {
    return this.httpClient.put(
      `https://flower.elevateegy.com/api/v1/occasions/${id}`,
      data,
      {
        headers: {
          token: this.getToken()!,
        },
      }
    );
  }
}
