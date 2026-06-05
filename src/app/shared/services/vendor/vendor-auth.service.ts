import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { VendorStorageConstant } from '../../constants/vendor-storage.constant';
import { ApiUrls } from '../../enums/api-urls';
import { environment } from '../../../../environments/environment';
import { VendorOnboardingStatus, VendorSession } from '../../models/vendor/vendor.models';

@Injectable({ providedIn: 'root' })
export class VendorAuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_SEND_OTP}`, { email });
  }

  verifyOtp(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_VERIFY_OTP}`, { email, code });
  }

  completeRegistration(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_COMPLETE_REGISTRATION}`, dto).pipe(
      tap((res: any) => {
        if (res.success) {
          this.saveSession(res.data);
          this.setOnboardingStatus('AccountCreated');
        }
      })
    );
  }

  login(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_LOGIN}`, dto).pipe(
      tap((res: any) => {
        if (res.success) {
          this.saveSession(res.data);
          // Also set onboarding status if available in login response
          if (res.data.onboardingStatus) {
            this.setOnboardingStatus(res.data.onboardingStatus);
          }
        }
      })
    );
  }

  completeProfile(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_COMPLETE_PROFILE}`, dto).pipe(
      tap((res: any) => {
        if (res.success) {
          this.setOnboardingStatus('ProfileCompleted');
        }
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ApiUrls.AUTH_ME}`);
  }

  navigateAfterAuth(): void {
    this.getCurrentUser().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          if (res.data.isAdmin) {
            this.router.navigate(['/a1/admin/dashboard']);
            return;
          }
          
          this.setOnboardingStatus(res.data.onboardingStatus);
          
          if (res.data.onboardingStatus === 'Approved') {
            this.router.navigate(['/vendor/dashboard']);
          } else if (res.data.onboardingStatus === 'AccountCreated') {
            this.router.navigate(['/vendor/profile']);
          } else if (res.data.onboardingStatus === 'ProfileCompleted') {
            this.router.navigate(['/vendor/business']);
          } else if (res.data.onboardingStatus === 'BusinessInfoSubmitted') {
            this.router.navigate(['/vendor/verification']);
          } else if (res.data.onboardingStatus === 'VerificationSubmitted') {
            this.router.navigate(['/vendor/approval']);
          } else if (res.data.onboardingStatus === 'Rejected') {
            this.router.navigate(['/vendor/dashboard']); // Dashboard shows rejection reason
          } else {
            this.router.navigate(['/vendor/dashboard']);
          }
        }
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  // Admin Methods
  getVendors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ApiUrls.AUTH_VENDORS}`);
  }

  approveVendor(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_APPROVE_VENDOR}/${id}`, {});
  }

  rejectVendor(id: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_REJECT_VENDOR}/${id}`, `"${reason}"`, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  loginWithGoogle(): Observable<any> {
    // Placeholder for Google login
    return of({ success: false, message: 'Google login not implemented yet' });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_FORGOT_PASSWORD}`, { email });
  }

  resetPassword(dto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_RESET_PASSWORD}`, dto);
  }

  getOnboardingStatus(): VendorOnboardingStatus {
    const raw = localStorage.getItem(VendorStorageConstant.OnboardingStatus);
    return (raw as VendorOnboardingStatus) || 'AccountCreated';
  }

  setOnboardingStatus(status: VendorOnboardingStatus): void {
    localStorage.setItem(VendorStorageConstant.OnboardingStatus, status);
  }

  getSession(): VendorSession | null {
    const raw = localStorage.getItem(VendorStorageConstant.Session);
    if (!raw) return null;
    try {
      const data = JSON.parse(raw);
      // Map backend AuthResponseDto to VendorSession
      return {
        userId: data.userId || '',
        email: data.email || '',
        displayName: data.displayName || data.email || 'Vendor',
        token: data.accessToken || '',
        provider: 'email'
      };
    } catch {
      return null;
    }
  }

  private saveSession(data: any): void {
    localStorage.setItem(VendorStorageConstant.Session, JSON.stringify(data));
    localStorage.setItem(VendorStorageConstant.Token, data.accessToken);
    localStorage.setItem(VendorStorageConstant.RefreshToken, data.refreshToken);
  }

  logout(): void {
    localStorage.removeItem(VendorStorageConstant.Session);
    localStorage.removeItem(VendorStorageConstant.Token);
    localStorage.removeItem(VendorStorageConstant.RefreshToken);
    localStorage.removeItem(VendorStorageConstant.OnboardingStatus);
    localStorage.removeItem(VendorStorageConstant.Business);
    localStorage.removeItem(VendorStorageConstant.Documents);
    localStorage.removeItem(VendorStorageConstant.Profile);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(VendorStorageConstant.Token);
  }

  getUserId(): string | null {
    const session = this.getSession();
    return session?.userId || null;
  }

  getToken(): string | null {
    return localStorage.getItem(VendorStorageConstant.Token);
  }
}
