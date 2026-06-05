import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideLoader2 } from '@lucide/angular';
import { VendorAuthService } from '../../../shared/services/vendor/vendor-auth.service';
import { VendorFieldComponent } from '../../../shared/components/vendor/vendor-field.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, LucideLoader2, VendorFieldComponent, FadeInDirective],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100" appFadeIn>
        <div class="text-center mb-8">
          <h1 class="text-3xl font-black text-[#0d7a52] tracking-tighter">BORVI <span class="text-gray-400 font-light">ADMIN</span></h1>
          <p class="text-gray-500 mt-2">Central Management Portal</p>
        </div>

        @if (error()) {
          <div class="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl">
            {{ error() }}
          </div>
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <app-vendor-field formControlName="email" label="Admin Email" type="email" icon="mail" />
          <app-vendor-field formControlName="password" label="Password" type="password" icon="lock" />
          
          <button type="submit" [disabled]="loading()" class="vp-btn vp-btn--primary w-full h-12">
            @if (loading()) {
              <svg lucideLoader2 class="vp-btn__spin" [size]="20"></svg>
            }
            Secure Login
          </button>
        </form>
      </div>
    </div>
  `
})
export class AdminLoginPageComponent {
  private readonly auth = inject(VendorAuthService);
  private readonly router = inject(Router);
  
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        if (res.success) {
          this.auth.navigateAfterAuth();
        } else {
          this.error.set(res.message || 'Login failed');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Invalid admin credentials');
      }
    });
  }
}
