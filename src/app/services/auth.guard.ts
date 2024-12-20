import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Ruolo } from '../types/db.type';



export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data?.['role'];
  console.log('isLoggedIn:', authService.isLoggedIn);
  console.log('userRole:', authService.userRole);
  console.log('expectedRole:', expectedRole);

  if (authService.isLoggedIn && authService.userRole === expectedRole) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};