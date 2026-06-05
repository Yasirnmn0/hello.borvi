import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { VendorAuthService } from '../../shared/services/vendor/vendor-auth.service';
import { catchError, map, of } from 'rxjs';

export const vendorAuthGuard: CanActivateFn = (_, state) => {
  const auth = inject(VendorAuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return router.navigate(['/login']);
  }

  // Check if profile is completed
  return auth.getCurrentUser().pipe(
    map(res => {
      const user = res.data;
      const url = state.url;
      
      if (user.isAdmin) return true;

      const status = user.onboardingStatus;
      
      // Mandatory sequence
      if (status === 'AccountCreated' && !url.includes('/vendor/profile')) {
        return router.parseUrl('/vendor/profile');
      }
      if (status === 'ProfileCompleted' && !url.includes('/vendor/business')) {
        return router.parseUrl('/vendor/business');
      }
      if (status === 'BusinessInfoSubmitted' && !url.includes('/vendor/verification')) {
        return router.parseUrl('/vendor/verification');
      }
      if (status === 'VerificationSubmitted' && !url.includes('/vendor/approval')) {
        return router.parseUrl('/vendor/approval');
      }
      
      // If rejected, they can see dashboard (to see reason) or go back to fix
      if (status === 'Rejected') {
        return true;
      }

      return true;
    }),
    catchError(() => {
      return of(true); // Fallback to allow navigation if API fails
    })
  );
};

export const vendorGuestGuard: CanActivateFn = () => {
  const auth = inject(VendorAuthService);
  const router = inject(Router);
  
  if (!auth.isLoggedIn()) {
    return true;
  }

  return auth.getCurrentUser().pipe(
    map(res => {
      const user = res.data;
      if (user && user.isProfileCompleted) {
        return router.parseUrl('/vendor/dashboard');
      } else {
        return router.parseUrl('/vendor/profile');
      }
    }),
    catchError(() => {
      return of(router.parseUrl('/vendor/dashboard'));
    })
  );
};

export const vendorApprovedGuard: CanActivateFn = () => {
  const auth = inject(VendorAuthService);
  const router = inject(Router);
  
  if (!auth.isLoggedIn()) {
    return router.parseUrl('/login');
  }

  return auth.getCurrentUser().pipe(
    map(res => {
      const user = res.data;
      if (user.onboardingStatus === 'Approved') {
        return true;
      }
      return router.parseUrl('/vendor/approval');
    }),
    catchError(() => of(router.parseUrl('/vendor/approval')))
  );
};
