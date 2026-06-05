import { Component } from '@angular/core';
import { AppBenefitsComponent } from './app-benefits.component';
import { CtaBannerComponent } from './cta-banner.component';
import { FeaturesRowComponent } from './features-row.component';
import { StepsGridComponent } from './steps-grid.component';
import { StepsHeroComponent } from './steps-hero.component';

@Component({
  selector: 'app-how-it-works-page',
  standalone: true,
  imports: [
    StepsHeroComponent,
    StepsGridComponent,
    FeaturesRowComponent,
    AppBenefitsComponent,
    CtaBannerComponent,
  ],
  template: `
    <app-steps-hero />
    <app-steps-grid />
    <app-features-row />
    <app-app-benefits />
    <app-cta-banner />
  `,
})
export class HowItWorksPageComponent {}
