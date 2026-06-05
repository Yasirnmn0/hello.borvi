import { Component } from '@angular/core';
import { AppDownloadSectionComponent } from './app-download-section.component';
import { CategoriesSectionComponent } from './categories-section.component';
import { HeroSectionComponent } from './hero-section.component';
import { HowItWorksPreviewComponent } from './how-it-works-preview.component';
import { StatsSectionComponent } from './stats-section.component';
import { TestimonialsSectionComponent } from './testimonials-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    CategoriesSectionComponent,
    HowItWorksPreviewComponent,
    AppDownloadSectionComponent,
    StatsSectionComponent,
    TestimonialsSectionComponent,
  ],
  template: `
    <app-hero-section />
    <app-categories-section />
    <app-how-it-works-preview />
    <app-app-download-section />
    <app-stats-section />
    <app-testimonials-section />
  `,
})
export class HomePageComponent {}
