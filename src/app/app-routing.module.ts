import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {    path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Manager','User'],
      animation: 'isHome'
    }
  },
  {
    path: 'about',
    component: AboutComponent, canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Manager','User'],
      animation: 'isAbout'
    }
  },
  {
    path: 'users',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['Admin','Manager'],
      animation: 'isUsers'
    },
    children : [
      {
        path: '',
        component: UsersComponent, canActivate: [AuthGuard]

      },
      {
        path: 'add',
        component: AddUserComponent, canActivate: [AuthGuard]
      },
      {
        path: 'edit/:id',
        component: EditUserComponent, canActivate: [AuthGuard]
      }

    ]
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    data: {
      roles: ['Admin','Manager','User'],
      animation: 'isProducts'
    },
    children : [
      {
        path: '',
        component: ProductsComponent, canActivate: [AuthGuard]

      },
      {
        path: 'add',
        component: AddProductComponent, canActivate: [AuthGuard]
      },
      {
        path: 'edit/:id',
        component: EditProductComponent, canActivate: [AuthGuard]
      }

    ]
  },
  {
    path: 'accessdenied',
    component: UnauthorizedComponent, canActivate: [AuthGuard],
    data: {
      animation: 'isUnauthorized'
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
