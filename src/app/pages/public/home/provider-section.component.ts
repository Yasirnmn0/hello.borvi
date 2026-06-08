import { Component } from '@angular/core';
import { LucideUserPlus } from '@lucide/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { providerBenefits } from '../../../shared/constants/homedata';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { SectionHeadingComponent } from '../../../shared/components/borvi/section-heading.component';

@Component({
  selector: 'app-provider-section',
  standalone: true,
  imports: [
    TranslatePipe,
    AppImageComponent,
    LucideUserPlus,
    SectionHeadingComponent,
  ],
  templateUrl: './provider-section.component.html',
})
export class ProviderSectionComponent {
  readonly benefits = providerBenefits;

  scrollToAppDownload(): void {
    document
      .getElementById('AppDownload')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
