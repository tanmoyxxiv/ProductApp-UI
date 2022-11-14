import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const allowedRoles = route.data['roles'];

    const role = localStorage.getItem("role");


    if(allowedRoles.includes(role)){
      return true;
    }
    this.router.navigate(['/accessdenied']);
    return false;
  }

}
