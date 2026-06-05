import { Component } from '@angular/core';
import { ContactCardsGridComponent } from './contact-cards-grid.component';
import { ContactHeroComponent } from './contact-hero.component';
import { ContactMapAreaComponent } from './contact-map-area.component';
import { ContactSupportGridComponent } from './contact-support-grid.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    ContactHeroComponent,
    ContactCardsGridComponent,
    ContactMapAreaComponent,
    ContactSupportGridComponent,
  ],
  template: `
    <app-contact-hero />
    <app-contact-cards-grid />
    <app-contact-map-area />
    <app-contact-support-grid />
  `,
})
export class ContactPageComponent {}
