import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from 'src/app/models/authenticated-response.model';
import { LoginModel } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;
  credentials: LoginModel = {username:'', password:''};

  baseApiUrl : string = environment.baseApiUrl;

  constructor(private router: Router, private http: HttpClient, private jwtHelperService: JwtHelperService) { }


  ngOnInit(): void {

  }

  login = ( form: NgForm) => {
    if (form.valid) {
      // console.log(this.credentials);
      this.http.post<AuthenticatedResponse>(this.baseApiUrl +"/api/Auth/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          console.log(token);
          const decodeToken = this.jwtHelperService.decodeToken(token);

          console.log(decodeToken);

          localStorage.setItem("jwt", token);
          localStorage.setItem("id", decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
          localStorage.setItem("name", decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]);
          localStorage.setItem("username", decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber"]);
          localStorage.setItem("role" , decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
          this.invalidLogin = false;
          this.router.navigate(["/home"]);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.invalidLogin = true
        }
      })
    }
  }
}
