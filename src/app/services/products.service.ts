import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseApiUrl : string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseApiUrl + '/api/Products')
  }

  addProduct(addProductRequest: Product): Observable<Product>{
    return this.http.post<Product>(this.baseApiUrl + '/api/Products',addProductRequest);

  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.baseApiUrl + '/api/Products/' + id);
  }

  updateProduct(id:number, updateProductRequest: Product):Observable<Product>{
    return this.http.put<Product>(this.baseApiUrl + '/api/Products/' + id, updateProductRequest);
  }

  changeStatus(id:number, body: Status):Observable<Product>{
    return this.http.put<Product>(this.baseApiUrl + '/api/Products/changeStatus/' + id , body);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(this.baseApiUrl + '/api/Products/' + id);
  }
}
