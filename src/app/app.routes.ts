import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { RolesComponent } from './pages/roles/roles.component';
import { roleGuard } from './guards/role.guard';
import { CategoriaComponent } from './pages/categoria/categoria.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin']
    }
  },
  {
    path: 'categorias',
    component: CategoriaComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['Admin']
    }
  }
];
