import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/borvi/layout.component';
import { AboutPageComponent } from './pages/public/about/about-page.component';
import { ContactPageComponent } from './pages/public/contact/contact-page.component';
import { HomePageComponent } from './pages/public/home/home-page.component';
import { HowItWorksPageComponent } from './pages/public/how-it-works/how-it-works-page.component';
import { ImpressumPageComponent } from './pages/public/legal/impressum-page.component';
import { FaqPageComponent } from './pages/public/legal/faq-page.component';
import { HelpPageComponent } from './pages/public/legal/help-page.component';
import { PrivacyPageComponent } from './pages/public/legal/privacy-page.component';
import { TermsPageComponent } from './pages/public/legal/terms-page.component';
import { AuthLayoutComponent } from './pages/public/auth/auth-layout.component';
import { LoginPageComponent } from './pages/public/auth/login/login-page.component';
import { SignupPageComponent } from './pages/public/auth/signup/signup-page.component';
import { ForgotPasswordPageComponent } from './pages/public/auth/forgot-password/forgot-password-page.component';
import { AdminLoginPageComponent } from './pages/private/admin/admin-login-page.component';
import { AdminDashboardComponent } from './pages/private/admin/admin-dashboard.component';
import { VendorLayoutComponent } from './pages/private/vendor/layout/vendor-layout.component';
import { VendorDashboardComponent } from './pages/private/vendor/dashboard/vendor-dashboard.component';
import { VendorProfileComponent } from './pages/private/vendor/profile/vendor-profile.component';
import { VendorBusinessComponent } from './pages/private/vendor/business/vendor-business.component';
import { VendorVerificationComponent } from './pages/private/vendor/verification/vendor-verification.component';
import { VendorApprovalComponent } from './pages/private/vendor/approval/vendor-approval.component';
import { VendorProductsComponent } from './pages/private/vendor/products/vendor-products.component';
import { VendorProductFormComponent } from './pages/private/vendor/products/vendor-product-form.component';
import {
  vendorAuthGuard,
  vendorGuestGuard,
  vendorApprovedGuard,
} from './core/guards/vendor-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'how-it-works', component: HowItWorksPageComponent },
      { path: 'contact', component: ContactPageComponent },
      { path: 'impressum', component: ImpressumPageComponent },
      { path: 'privacy', component: PrivacyPageComponent },
      { path: 'terms', component: TermsPageComponent },
      { path: 'faq', component: FaqPageComponent },
      { path: 'help', component: HelpPageComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [vendorGuestGuard],
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'signup', component: SignupPageComponent },
      { path: 'forgot-password', component: ForgotPasswordPageComponent },
    ],
  },
  {
    path: 'a1/admin',
    children: [
      { path: 'login', component: AdminLoginPageComponent },
      { 
        path: 'dashboard', 
        component: AdminDashboardComponent,
        canActivate: [vendorAuthGuard] // Reuse auth guard, it checks isAdmin
      },
    ]
  },
  {
    path: 'vendor',
    component: VendorLayoutComponent,
    canActivate: [vendorAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: VendorDashboardComponent },
      { path: 'profile', component: VendorProfileComponent },
      { path: 'business', component: VendorBusinessComponent },
      { path: 'verification', component: VendorVerificationComponent },
      { path: 'approval', component: VendorApprovalComponent },
      {
        path: 'products',
        canActivate: [vendorApprovedGuard],
        children: [
          { path: '', component: VendorProductsComponent },
          { path: 'new', component: VendorProductFormComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
