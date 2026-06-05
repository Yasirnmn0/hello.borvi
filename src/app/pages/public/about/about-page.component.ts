import { Component } from '@angular/core';
import { AboutCtaBannerComponent } from './about-cta-banner.component';
import { AboutHeroComponent } from './about-hero.component';
import { AboutStatsComponent } from './about-stats.component';
import { OurStoryComponent } from './our-story.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    AboutHeroComponent,
    OurStoryComponent,
    AboutStatsComponent,
    AboutCtaBannerComponent,
  ],
  template: `
    <app-about-hero />
    <app-our-story />
    <app-about-stats />
    <app-about-cta-banner />
  `,
})
export class AboutPageComponent {}
