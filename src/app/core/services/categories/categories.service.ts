import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }

myToken = localStorage.getItem('token')

 getAllGategories():Observable<any>{
  return this.httpClient.get('https://flower.elevateegy.com/api/v1/categories')
 } 


 removeCategory(id:string):Observable<any>{
return this.httpClient.delete(`https://flower.elevateegy.com/api/v1/categories/${id}`,{
  headers:{
    token: this.myToken  ?? ''
  }
})
 }
}
