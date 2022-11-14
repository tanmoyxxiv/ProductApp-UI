import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  role : any = localStorage.getItem("role");
  name : any = localStorage.getItem("name");
  constructor(private jwtHelper: JwtHelperService, private router : Router) { }


  ngOnInit(): void {
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    this.router.navigate(["login"]);
  }

}
