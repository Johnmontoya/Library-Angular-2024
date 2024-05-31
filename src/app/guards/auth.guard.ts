import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackbar = inject(MatSnackBar);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  matSnackbar.open('Debes iniciar sesión para acceder a esta pagina', 'Ok', {
    duration: 5000
  });

  router.navigate(['/']);
  return false;
} 
