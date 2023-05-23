import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  fadeInOut, routeTransitionAnimations } from './animations/route-animations';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
	animations: [fadeInOut,routeTransitionAnimations]
})
export class AppComponent {
  title = 'ProductApp-UI';

  constructor(private jwtHelper: JwtHelperService) { }

  prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    return false;
  }
}
