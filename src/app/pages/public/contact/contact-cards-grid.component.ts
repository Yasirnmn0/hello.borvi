import { Component } from '@angular/core';
import {
  LucideClock,
  LucideMail,
  LucideMapPin,
  LucidePhone,
} from '@lucide/angular';
import {
  ContactChannel,
  channels,
} from '../../../shared/constants/contactdata';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { SectionHeadingComponent } from '../../../shared/components/borvi/section-heading.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
@Component({
  selector: 'app-contact-cards-grid',
  standalone: true,
  imports: [
    SectionHeadingComponent,
    FadeInDirective,
    LucidePhone,
    LucideMail,
    LucideMapPin,
    LucideClock,
    TranslatePipe,
  ],
  templateUrl: './contact-cards-grid.component.html',
})
export class ContactCardsGridComponent {
  readonly channels = channels;

  isExternal(link: string | null): boolean {
    return !!link?.startsWith('http');
  }

  cardClasses(channel: ContactChannel): string {
    const base =
      'bg-neutral-50/50 rounded-2xl border border-neutral-100/80 p-8 flex items-start gap-4 transition-all duration-300 ';
    return channel.link
      ? base +
          'hover:bg-white hover:shadow-lg hover:shadow-neutral-100/60 cursor-pointer group'
      : base + 'cursor-default';
  }
}
