import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingStepperComponent } from '../../../../shared/components/vendor/onboarding-stepper.component';
import { VendorFieldComponent } from '../../../../shared/components/vendor/vendor-field.component';
import { VendorFormActionsComponent } from '../../../../shared/components/vendor/vendor-form-actions.component';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OnboardingStepperComponent,
    VendorFieldComponent,
    VendorFormActionsComponent,
    VendorPageShellComponent,
    TranslatePipe,
  ],
  templateUrl: './vendor-profile.component.html',
})
export class VendorProfileComponent implements OnInit {
  private readonly vendorAuth = inject(VendorAuthService);
  private readonly router = inject(Router);
  readonly saved = signal(false);
  readonly saving = signal(false);
  readonly isReadOnly = signal(false);

  readonly form = new FormGroup({
    fullLegalName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    profilePictureUrl: new FormControl(''),
  });

  ngOnInit(): void {
    this.vendorAuth.getCurrentUser().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const userData = { ...res.data };
          if (userData.dateOfBirth) {
            userData.dateOfBirth = userData.dateOfBirth.split('T')[0];
          }
          this.form.patchValue(userData);
          
          const status = res.data.onboardingStatus;
          if (status === 'VerificationSubmitted' || status === 'Approved') {
            this.isReadOnly.set(true);
            this.form.disable();
          } else {
            this.isReadOnly.set(false);
            this.form.enable();
          }
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.vendorAuth.completeProfile(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.saving.set(false);
        if (res.success) {
          this.saved.set(true);
          setTimeout(() => {
            this.saved.set(false);
            this.router.navigate(['/vendor/dashboard']);
          }, 2000);
        }
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}
