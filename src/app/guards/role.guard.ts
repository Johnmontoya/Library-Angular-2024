import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const authService = inject(AuthService);
  const matSnackBar = inject(MatSnackBar);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    matSnackBar.open('Debes iniciar sesion para acceder a esta pagina', 'Ok', {
      duration: 5000,
    });
    return false;
  }

  const userRoles = authService.getRoles();

  if (roles.some((role) => userRoles?.includes(role))) {
    return true;
  }

  matSnackBar.open('No tiene permisos para ver esta pagina', 'Ok', {
    duration: 5000,
  });

  return false;
};
