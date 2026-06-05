import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { LocalStorageConstant } from '../../shared/constants/local-storage.constant';
import { LoginResponseModel } from '../../shared/models/login.model';
import { ApiUrls } from '../../shared/enums/api-urls';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly REMEMBER_ME_KEY = 'remember_me';
  private refreshTimer?: Subscription;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  // 🔹 Handle successful login response
  handleLoginResponse(res: LoginResponseModel, rememberMe: boolean = false): void {
    if (res.success && res.data?.token) {
      // Store authentication info
      localStorage.setItem(LocalStorageConstant.Token, res.data.token);
      localStorage.setItem(LocalStorageConstant.UserId, res.data.userId.toString());
      localStorage.setItem(LocalStorageConstant.CompanyId, res.data.companyId.toString());
      localStorage.setItem(LocalStorageConstant.RoleId, res.data.roleId.toString());
      localStorage.setItem(LocalStorageConstant.RoleName, res.data.roleName);
      localStorage.setItem(LocalStorageConstant.Rights, JSON.stringify(res.data.rights));
      localStorage.setItem(LocalStorageConstant.AllowedShopIds, JSON.stringify(res.data.allowedShopIds));
      if (res.data.companyCollectionId) {
        localStorage.setItem(LocalStorageConstant.CompanyCollectionId, res.data.companyCollectionId);
      }
      if (rememberMe) {
        localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
      } else {
        this.clearRememberMe();
      }

      // 🔹 Start auto token refresh
      this.scheduleTokenRefresh(10000 * 6 * 55);

      // 🔹 Fetch menu once on login, store in localStorage, then navigate
      this.apiService.get(ApiUrls.GET_SIDEMENU).pipe(take(1)).subscribe({
        next: (menuRes: any) => {
          if (menuRes && typeof menuRes.success !== 'undefined') {
            localStorage.setItem(LocalStorageConstant.Sidemenu, JSON.stringify(menuRes));
          }
          if (menuRes.success && Array.isArray(menuRes.data) && menuRes.data.length > 0) {
            const allowedRoutes = menuRes.data.map((item: any) => item.routePath);
            this.setAllowedRoutes(allowedRoutes);

            const firstRoute = allowedRoutes[0] || '/app/home';
            this.router.navigate([firstRoute]);
          } else {
            this.setAllowedRoutes([]);
            this.router.navigate(['/app/home']);
          }
        },
        error: () => {
          this.router.navigate(['/app/home']);
        }
      });
    }
  }

  // 🔹 Store allowed menu routes from GET_SIDEMENU
  setAllowedRoutes(routes: string[]): void {
    localStorage.setItem(LocalStorageConstant.AllowedRoutes, JSON.stringify(routes));
  }

  // 🔹 Check if route is allowed
  isRouteAllowed(route: string): boolean {
    const raw = localStorage.getItem(LocalStorageConstant.AllowedRoutes);
    if (!raw) return false;
    const allowedRoutes: string[] = JSON.parse(raw);
    // Normalize path comparison (case-insensitive)
    return allowedRoutes.some(r => route.toLowerCase().startsWith(r.toLowerCase()));
  }

  // 🔹 Check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem(LocalStorageConstant.Token);
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  // 🔹 Check if token is expired
  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    const expiry = this.getTokenExpirationDate(token);
    if (!expiry) return false; // If we can't decode it, assume valid (or handle as invalid depending on strictness)

    // Check if expired (compare with current time)
    return Math.floor(new Date().getTime() / 1000) >= Math.floor(expiry.getTime() / 1000);
  }

  // 🔹 Decode token to get expiration date
  private getTokenExpirationDate(token: string): Date | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padding = base64.length % 4;
      if (padding) {
        base64 += '='.repeat(4 - padding);
      }

      const decoded = JSON.parse(atob(base64));
      if (!decoded.exp) return null;

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch (e) {
      return null;
    }
  }

  // 🔹 Setup automatic token refresh
  private scheduleTokenRefresh(delayMs: number): void {
    this.stopTokenRefresh();

    this.refreshTimer = timer(delayMs).subscribe(() => {
      this.refreshToken().subscribe({
        next: (response) => {
          if (response.success && response.data?.token) {
            localStorage.setItem(LocalStorageConstant.Token, response.data.token);
            this.scheduleTokenRefresh(10000 * 6 * 55);
          } else {
            this.logout();
          }
        },
        error: () => this.logout(),
      });
    });
  }

  private stopTokenRefresh(): void {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
      this.refreshTimer = undefined;
    }
  }

  // 🔹 Refresh token API call
  refreshToken() {
    return this.apiService.post<any>(ApiUrls.REFRESH_TOKEN, {
      refreshToken: ''
    });
  }

  // 🔹 Logout user and clear all data
  logout() {
    this.stopTokenRefresh();

    const token = localStorage.getItem(LocalStorageConstant.Token);

    // Clear data IMMEDIATELY to prevent broken UI state
    this.clearAuthData();
    this.router.navigate(['/login']);

    if (token) {
      const options = { headers: { Authorization: `Bearer ${token}` } };
      // Fire and forget logout call
      this.apiService.post(ApiUrls.LOGOUT, { refreshToken: '' }, options).subscribe({
        next: () => { }, // Already handled
        error: () => { } // Already handled
      });
    }
  }

  // 🔹 Clear all auth-related data
  private clearAuthData(): void {
    this.stopTokenRefresh();
    localStorage.removeItem(LocalStorageConstant.Token);
    localStorage.removeItem(LocalStorageConstant.UserId);
    localStorage.removeItem(LocalStorageConstant.CompanyId);
    localStorage.removeItem(LocalStorageConstant.RoleId);
    localStorage.removeItem(LocalStorageConstant.RoleName);
    localStorage.removeItem(LocalStorageConstant.Rights);
    localStorage.removeItem(LocalStorageConstant.AllowedShopIds);
    localStorage.removeItem(LocalStorageConstant.AllowedRoutes);
    localStorage.removeItem(LocalStorageConstant.Sidemenu);
    this.clearRememberMe();
  }

  private clearRememberMe(): void {
    localStorage.removeItem(this.REMEMBER_ME_KEY);
  }
  getAllowedRoutes(): string[] {
    const raw = localStorage.getItem(LocalStorageConstant.AllowedRoutes);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }

  // 🔹 Check remember-me preference
  hasRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
  }

  // 🔹 Try auto-login based on remember-me
  tryAutoLogin() {
    if (this.hasRememberMe() && !this.isLoggedIn()) {
      return this.refreshToken();
    }
    return null;
  }

  // 🔹 Initialize token refresh (on app start)
  initializeTokenRefresh(): void {
    if (this.isLoggedIn()) {
      this.scheduleTokenRefresh(10000 * 6 * 55);
    }
  }
}
