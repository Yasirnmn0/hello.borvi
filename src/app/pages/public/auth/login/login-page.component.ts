import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideLoader2 } from '@lucide/angular';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { VendorFieldComponent } from '../../../../shared/components/vendor/vendor-field.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideLoader2,
    FadeInDirective,
    VendorFieldComponent,
    TranslatePipe,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private readonly vendorAuth = inject(VendorAuthService);
  private readonly i18n = inject(TranslationService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    remember: new FormControl(true),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    const { email, password } = this.form.getRawValue();
    this.vendorAuth.login({ email, password }).subscribe({
      next: (res: any) => {
        this.loading.set(false);
        if (res.success) {
          this.vendorAuth.navigateAfterAuth();
        } else {
          this.error.set(this.i18n.instant(res.message ?? 'auth.login.errorFailed'));
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set(this.i18n.instant('auth.login.errorGeneric'));
      },
    });
  }

  signInWithGoogle(): void {
    this.loading.set(true);
    this.error.set(null);
    this.vendorAuth.loginWithGoogle().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        if (res.success) {
          this.vendorAuth.navigateAfterAuth();
        } else {
          this.error.set(this.i18n.instant(res.message ?? 'auth.login.errorGoogle'));
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set(this.i18n.instant('auth.login.errorGoogle'));
      },
    });
  }
}
