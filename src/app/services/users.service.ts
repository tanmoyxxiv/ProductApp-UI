import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl : string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.baseApiUrl + '/api/Users')
  }

  addUser(addUserRequest: User): Observable<User>{
    return this.http.post<User>(this.baseApiUrl + '/api/Users',addUserRequest);

  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.baseApiUrl + '/api/Users/' + id);
  }

  updateUser(id:number, updateUserRequest: User):Observable<User>{
    return this.http.put<User>(this.baseApiUrl + '/api/Users/' + id, updateUserRequest);
  }

  deleteUser(id: number): Observable<User>{
    return this.http.delete<User>(this.baseApiUrl + '/api/Users/' + id);
  }
}
