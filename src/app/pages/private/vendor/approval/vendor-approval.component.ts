import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideClock, LucideCheckCircle, LucideXCircle } from '@lucide/angular';
import { OnboardingStepperComponent } from '../../../../shared/components/vendor/onboarding-stepper.component';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-vendor-approval',
  standalone: true,
  imports: [
    RouterLink,
    OnboardingStepperComponent,
    VendorPageShellComponent,
    FadeInDirective,
    LucideClock,
    LucideCheckCircle,
    LucideXCircle,
    TranslatePipe,
  ],
  templateUrl: './vendor-approval.component.html',
})
export class VendorApprovalComponent implements OnInit {
  private readonly auth = inject(VendorAuthService);
  
  status = signal<string>('VerificationSubmitted');
  rejectionReason = signal<string | null>(null);

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(res => {
      if (res.success && res.data) {
        this.status.set(res.data.onboardingStatus);
        this.rejectionReason.set(res.data.rejectionReason);
      }
    });
  }
}
