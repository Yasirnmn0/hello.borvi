import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from '../../../../core/services/translation.service';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';
import { OnboardingStepperComponent } from '../../../../shared/components/vendor/onboarding-stepper.component';
import { VendorFieldComponent, VendorSelectOption } from '../../../../shared/components/vendor/vendor-field.component';
import { VendorFormActionsComponent } from '../../../../shared/components/vendor/vendor-form-actions.component';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { VendorCategory } from '../../../../shared/models/vendor/vendor.models';
import { VendorDataService } from '../../../../shared/services/vendor/vendor-data.service';

@Component({
  selector: 'app-vendor-business',
  standalone: true,
  imports: [
    OnboardingStepperComponent,
    VendorFieldComponent,
    VendorFormActionsComponent,
    VendorPageShellComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './vendor-business.component.html',
})
export class VendorBusinessComponent implements OnInit {
  private readonly data = inject(VendorDataService);
  private readonly i18n = inject(TranslationService);
  private readonly router = inject(Router);
  
  readonly saved = signal(false);
  readonly saving = signal(false);
  readonly isReadOnly = signal(false);

  readonly form = new FormGroup({
    businessName: new FormControl('', Validators.required),
    businessType: new FormControl('', Validators.required),
    businessRegistrationNumber: new FormControl('', Validators.required),
    businessAddress: new FormControl('', Validators.required),
  });

  categoryOptions: { value: string; label: string }[] = [];

  ngOnInit(): void {
    this.data.getBusiness().subscribe(existing => {
      if (existing) {
        this.form.patchValue(existing);
      }
    });

    // Check status for read-only
    inject(VendorAuthService).getCurrentUser().subscribe(res => {
      if (res.success && res.data) {
        const status = res.data.onboardingStatus;
        if (status === 'VerificationSubmitted' || status === 'Approved') {
          this.isReadOnly.set(true);
          this.form.disable();
        } else {
          this.isReadOnly.set(false);
          this.form.enable();
        }
      }
    });

    this.data.getSeed().subscribe((seed) => {
      this.categoryOptions = seed.categories.map((c: any) => ({
        value: c.id,
        label: this.i18n.instant(`vendor.categories.${c.id}`),
      }));
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.data.saveBusiness(this.form.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.saved.set(true);
        setTimeout(() => {
          this.saved.set(false);
          this.router.navigate(['/vendor/verification']);
        }, 1500);
      },
      error: () => this.saving.set(false)
    });
  }
}
