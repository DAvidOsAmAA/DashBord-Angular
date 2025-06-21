import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getAllGategories(): Observable<any> {
    return this.httpClient.get(
      'https://flower.elevateegy.com/api/v1/categories'
    );
  }

  addCatgory(data: any): Observable<any> {
    return this.httpClient.post(
      'https://flower.elevateegy.com/api/v1/categories',
      data,
      {
        headers: {
          token: this.getToken()!,
        },
      }
    );
  }


getCategory(id:string):Observable<any>{
return this.httpClient.get(`https://flower.elevateegy.com/api/v1/categories/${id}`);
}

editCategory(id:string,data:any):Observable<any>{
  return this.httpClient.put(`https://flower.elevateegy.com/api/v1/categories/${id}`,data,{
    headers: {
      token: this.getToken()!,
    },
  });
}

  removeCategory(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://flower.elevateegy.com/api/v1/categories/${id}`,
      {
        headers: {
          token: this.getToken()!,
        },
      }
    );
  }
}
