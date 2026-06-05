import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { LucideArrowRight, LucideClock, LucideShieldCheck, LucideUser, LucidePackage, LucideStore } from '@lucide/angular';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { OnboardingStepperComponent } from '../../../../shared/components/vendor/onboarding-stepper.component';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { isAtLeast } from '../../../../shared/constants/vendor-onboarding-steps';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';
import { VendorDataService } from '../../../../shared/services/vendor/vendor-data.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    FadeInDirective,
    OnboardingStepperComponent,
    VendorPageShellComponent,
    LucideArrowRight,
    LucideClock,
    LucideShieldCheck,
    LucideUser,
    LucidePackage,
    LucideStore,
    TranslatePipe,
  ],
  templateUrl: './vendor-dashboard.component.html',
})
export class VendorDashboardComponent implements OnInit {
  private readonly auth = inject(VendorAuthService);
  private readonly data = inject(VendorDataService);

  stats$!: Observable<{
    productCount: number;
    publishedCount: number;
    onboardingPercent: number;
  }>;
  user$ = signal<any>(null);

  readonly displayName = signal<string>('Vendor');
  readonly status = signal<string>('AccountCreated');
  readonly rejectionReason = signal<string | null>(null);
  
  readonly isApproved = computed(() => this.status() === 'Approved');
  readonly isRejected = computed(() => this.status() === 'Rejected');
  
  readonly nextAction = computed(() => this.resolveNextAction());

  ngOnInit(): void {
    this.stats$ = this.data.getDashboardStats();
    this.auth.getCurrentUser().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.user$.set(res.data);
          this.status.set(res.data.onboardingStatus);
          this.rejectionReason.set(res.data.rejectionReason);
          this.displayName.set(res.data.fullLegalName || res.data.email.split('@')[0]);
        }
      }
    });
  }

  statCards(stats: {
    productCount: number;
    publishedCount: number;
    onboardingPercent: number;
  }) {
    return [
      {
        labelKey: 'vendor.dashboard.progress',
        value: this.calculateProgress() + '%',
        subKey: 'vendor.dashboard.progressSub',
      },
      {
        labelKey: 'vendor.dashboard.productsTotal',
        value: '' + stats.productCount,
        subKey: 'vendor.dashboard.productsTotalSub',
      },
      {
        labelKey: 'vendor.dashboard.productsLive',
        value: '' + stats.publishedCount,
        subKey: 'vendor.dashboard.productsLiveSub',
      },
    ];
  }

  private calculateProgress(): number {
    const status = this.status();
    switch (status) {
      case 'Approved': return 100;
      case 'VerificationSubmitted': return 80;
      case 'BusinessInfoSubmitted': return 60;
      case 'ProfileCompleted': return 40;
      case 'AccountCreated': return 20;
      default: return 0;
    }
  }

  private resolveNextAction(): { labelKey: string; route: string; descKey: string } | null {
    const status = this.status();
    switch (status) {
      case 'Approved':
        return {
          labelKey: 'vendor.dashboard.actionProduct',
          route: '/vendor/products/new',
          descKey: 'vendor.dashboard.actionProductDesc',
        };
      case 'VerificationSubmitted':
        return {
          labelKey: 'vendor.dashboard.actionApproval',
          route: '/vendor/approval',
          descKey: 'vendor.dashboard.actionApprovalDesc',
        };
      case 'BusinessInfoSubmitted':
        return {
          labelKey: 'vendor.dashboard.actionVerification',
          route: '/vendor/verification',
          descKey: 'vendor.dashboard.actionVerificationDesc',
        };
      case 'ProfileCompleted':
        return {
          labelKey: 'vendor.dashboard.actionBusiness',
          route: '/vendor/business',
          descKey: 'vendor.dashboard.actionBusinessDesc',
        };
      case 'AccountCreated':
        return {
          labelKey: 'vendor.dashboard.actionProfile',
          route: '/vendor/profile',
          descKey: 'vendor.dashboard.actionProfileDesc',
        };
      case 'Rejected':
        return {
          labelKey: 'vendor.dashboard.actionFix',
          route: '/vendor/profile',
          descKey: 'vendor.dashboard.actionFixDesc',
        };
      default:
        return null;
    }
  }
}
