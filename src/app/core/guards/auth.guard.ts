import { Injectable } from '@angular/core';
const CLIENT_SIDE_APP_ROUTES = [
  '/app/calendar-event',
  '/app/peak-management',
  '/app/operating-hours',
  '/app/camera-status'
];

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isRedirecting = false; // prevent recursive redirect loops

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If user not logged in → go to login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Allow any app/* route when logged in (use route config path - reliable with hash routing)
    const routePath = route.routeConfig?.path || '';
    if (routePath.toLowerCase().startsWith('app/')) {
      return true;
    }

    // Also allow by state.url (normalize for hash strategy)
    const raw = (state.url || '').replace(/^#/, '').trim();
    const normalizedUrl = raw.startsWith('/') ? raw : '/' + raw;
    if (normalizedUrl.toLowerCase().startsWith('/app/')) {
      return true;
    }

    // Prevent recursive redirects
    if (this.isRedirecting) return false;

    // Check if route is allowed for non-/app routes
    if (!this.authService.isRouteAllowed(normalizedUrl)) {
      console.warn('Unauthorized access attempt:', normalizedUrl);

      const allowedRoutes = this.authService.getAllowedRoutes();
      const first = allowedRoutes[0];
      const safeRedirect = (first && first !== 'home' && first !== '/home') ? first : '/app/home';

      this.isRedirecting = true;
      this.router.navigate([safeRedirect]).finally(() => {
        this.isRedirecting = false;
      });
      return false;
    }

    return true;
  }
}
