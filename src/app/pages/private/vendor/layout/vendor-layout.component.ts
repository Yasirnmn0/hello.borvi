import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideLayoutDashboard,
  LucideUser,
  LucideBuilding2,
  LucideShieldCheck,
  LucideClock,
  LucidePackage,
  LucideLogOut,
  LucideMenu,
  LucidePlus,
} from '@lucide/angular';
import { AppImageComponent } from '../../../../shared/components/borvi/app-image.component';
import { LanguageSelectorVendorComponent } from '../../../../shared/components/layout/borvi/language-selector-vendor.component';
import { TranslationService } from '../../../../core/services/translation.service';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';
import { isAtLeast } from '../../../../shared/constants/vendor-onboarding-steps';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-vendor-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AppImageComponent,
    LanguageSelectorVendorComponent,
    TranslatePipe,
    LucideLayoutDashboard,
    LucideUser,
    LucideBuilding2,
    LucideShieldCheck,
    LucideClock,
    LucidePackage,
    LucideLogOut,
    LucideMenu,
    LucidePlus,
  ],
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.scss'],
})
export class VendorLayoutComponent implements OnInit {
  private readonly auth = inject(VendorAuthService);
  private readonly i18n = inject(TranslationService);

  readonly sidebarOpen = signal(false);
  readonly session = this.auth.getSession();
  readonly user = signal<any>(null);

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.user.set(res.data);
        }
      }
    });
  }

  readonly isApproved = computed(() =>
    isAtLeast(this.auth.getOnboardingStatus(), 'Approved')
  );

  private readonly navDefs = [
    { labelKey: 'vendor.nav.dashboard', route: '/vendor/dashboard', icon: 'dashboard', always: true },
    { labelKey: 'vendor.nav.profile', route: '/vendor/profile', icon: 'user', always: true },
    { labelKey: 'vendor.nav.business', route: '/vendor/business', icon: 'building', always: true },
    { labelKey: 'vendor.nav.verification', route: '/vendor/verification', icon: 'shield', always: true },
    { labelKey: 'vendor.nav.approval', route: '/vendor/approval', icon: 'clock', always: true },
    {
      labelKey: 'vendor.nav.products',
      route: '/vendor/products',
      icon: 'package',
      always: false,
      requiresApproval: true,
    },
  ];

  readonly visibleNav = computed(() => {
    this.i18n.lang();
    return this.navDefs
      .filter((n) => n.always || (n.requiresApproval && this.isApproved()))
      .map((n) => ({ ...n, label: this.i18n.instant(n.labelKey) }));
  });

  logout(): void {
    this.auth.logout();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
}
