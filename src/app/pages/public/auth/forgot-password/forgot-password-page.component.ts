import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideLoader2 } from '@lucide/angular';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { VendorFieldComponent } from '../../../../shared/components/vendor/vendor-field.component';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LucideLoader2, FadeInDirective, VendorFieldComponent],
  template: `
    <div class="vp-auth-card" appFadeIn [y]="24" [duration]="600">
      <h2 class="text-2xl font-extrabold text-[#111827] tracking-tight">Forgot Password</h2>
      <p class="mt-2 text-sm text-gray-500 leading-relaxed">
        @if (step() === 1) {
          Enter your email address and we'll send you a 6-digit code to reset your password.
        } @else {
          Enter the verification code sent to your email and your new password.
        }
      </p>

      @if (error()) {
        <div class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {{ error() }}
        </div>
      }
      @if (success()) {
        <div class="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="alert">
          {{ success() }}
        </div>
      }

      @if (step() === 1) {
        <form [formGroup]="emailForm" (ngSubmit)="onSendCode()" class="mt-6 space-y-4">
          <app-vendor-field formControlName="email" label="Email Address" type="email" icon="mail" placeholder="yourname@example.com" />
          <button type="submit" [disabled]="loading()" class="vp-btn vp-btn--primary w-full">
            @if (loading()) { <svg lucideLoader2 class="vp-btn__spin" [size]="18"></svg> }
            Send Reset Code
          </button>
        </form>
      } @else {
        <form [formGroup]="resetForm" (ngSubmit)="onResetPassword()" class="mt-6 space-y-4">
          <app-vendor-field formControlName="otpCode" label="Verification Code" icon="lock" placeholder="Enter 6-digit code" />
          <app-vendor-field formControlName="newPassword" label="New Password" type="password" icon="lock" placeholder="Enter new password" />
          <button type="submit" [disabled]="loading()" class="vp-btn vp-btn--primary w-full">
            @if (loading()) { <svg lucideLoader2 class="vp-btn__spin" [size]="18"></svg> }
            Reset Password
          </button>
        </form>
      }

      <div class="mt-8 text-center">
        <a routerLink="/login" class="text-sm font-bold text-[#0d7a52] hover:underline">Back to Login</a>
      </div>
    </div>
  `
})
export class ForgotPasswordPageComponent {
  private readonly auth = inject(VendorAuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);
  readonly step = signal<1 | 2>(1);

  readonly emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  readonly resetForm = new FormGroup({
    otpCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSendCode(): void {
    if (this.emailForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    const email = this.emailForm.get('email')?.value!;
    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.loading.set(false);
        this.step.set(2);
        this.success.set('Reset code sent to your email.');
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to send reset code.');
      }
    });
  }

  onResetPassword(): void {
    if (this.resetForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    const email = this.emailForm.get('email')?.value!;
    const { otpCode, newPassword } = this.resetForm.getRawValue();
    this.auth.resetPassword({ email, otpCode: otpCode!, newPassword: newPassword! }).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success) {
          this.success.set('Password reset successfully! Redirecting to login...');
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.error.set(res.message || 'Failed to reset password.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to reset password.');
      }
    });
  }
}
