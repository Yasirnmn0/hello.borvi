import { Component } from '@angular/core';
import {
  LucideShieldCheck,
  LucideUser,
  LucideDatabase,
  LucideCreditCard,
  LucideServer,
  LucideMail,
  LucideCookie,
  LucideScale,
} from '@lucide/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [
    TranslatePipe,
    LucideShieldCheck,
    LucideUser,
    LucideDatabase,
    LucideCreditCard,
    LucideServer,
    LucideMail,
    LucideCookie,
    LucideScale,
  ],
  templateUrl: './privacy-page.component.html',
})
export class PrivacyPageComponent {
  readonly sections = [
    {
      number: '01',
      icon: 'user',
      titleKey: 'footer.privacy.sections.controller.title',
      contentKey: 'footer.privacy.sections.controller.content',
    },
    {
      number: '02',
      icon: 'database',
      titleKey: 'footer.privacy.sections.data.title',
      contentKey: 'footer.privacy.sections.data.content',
    },
    {
      number: '03',
      icon: 'credit-card',
      titleKey: 'footer.privacy.sections.payment.title',
      contentKey: 'footer.privacy.sections.payment.content',
    },
    {
      number: '04',
      icon: 'server',
      titleKey: 'footer.privacy.sections.storage.title',
      contentKey: 'footer.privacy.sections.storage.content',
    },
    {
      number: '05',
      icon: 'scale',
      titleKey: 'footer.privacy.sections.rights.title',
      contentKey: 'footer.privacy.sections.rights.content',
    },
    {
      number: '06',
      icon: 'cookie',
      titleKey: 'footer.privacy.sections.cookies.title',
      contentKey: 'footer.privacy.sections.cookies.content',
    },
  ];
}
