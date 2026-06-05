import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideStore, LucideDownload, LucideArrowRight } from '@lucide/angular';
import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-vendor-cta-section',
  standalone: true,
  imports: [ContainerComponent, FadeInDirective, LucideStore, LucideDownload, LucideArrowRight, TranslatePipe],
  templateUrl: './vendor-cta-section.component.html',
})
export class VendorCtaSectionComponent {
  private readonly router = inject(Router);

  scrollToAppDownload(): void {
    document.getElementById('AppDownload')?.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
