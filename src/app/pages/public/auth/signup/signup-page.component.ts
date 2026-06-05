import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideLoader2 } from '@lucide/angular';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { VendorFieldComponent } from '../../../../shared/components/vendor/vendor-field.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';

function passwordsMatch(group: AbstractControl): { mismatch: boolean } | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideLoader2,
    FadeInDirective,
    VendorFieldComponent,
    TranslatePipe,
  ],
  templateUrl: './signup-page.component.html',
})
export class SignupPageComponent {
  private readonly vendorAuth = inject(VendorAuthService);
  private readonly i18n = inject(TranslationService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly step = signal<1 | 2 | 3>(1); // 1: Email, 2: OTP, 3: Password

  readonly emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  readonly otpForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  });

  readonly passwordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordsMatch }
  );

  onSendOtp(): void {
    if (this.emailForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    const email = this.emailForm.get('email')?.value!;
    this.vendorAuth.sendOtp(email).subscribe({
      next: () => {
        this.loading.set(false);
        this.step.set(2);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Failed to send OTP. Please try again.');
      },
    });
  }

  onVerifyOtp(): void {
    if (this.otpForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    const email = this.emailForm.get('email')?.value!;
    const code = this.otpForm.get('code')?.value!;
    this.vendorAuth.verifyOtp(email, code).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.data === true) {
          this.step.set(3);
        } else {
          this.error.set('Invalid verification code.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Verification failed.');
      },
    });
  }

  onCompleteRegistration(): void {
    if (this.passwordForm.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    const email = this.emailForm.get('email')?.value!;
    const password = this.passwordForm.get('password')?.value!;
    const otpCode = this.otpForm.get('code')?.value!;

    this.vendorAuth.completeRegistration({ email, password, otpCode }).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success) {
          this.router.navigate(['/login']);
        } else {
          this.error.set(res.message || 'Registration failed.');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Registration failed.');
      },
    });
  }

  signUpWithGoogle(): void {
    // ... same as before or updated for real Google auth
  }
}
