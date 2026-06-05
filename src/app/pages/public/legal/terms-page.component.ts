import { Component } from '@angular/core';
import {
  LucideFileCheck,
  LucideUsers,
  LucideUserCheck,
  LucideCreditCard,
  LucideShield,
  LucideCircleDollarSign,
  LucideReceipt,
  LucideMail,
} from '@lucide/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [
    TranslatePipe,
    LucideFileCheck,
    LucideUsers,
    LucideUserCheck,
    LucideCreditCard,
    LucideShield,
    LucideCircleDollarSign,
    LucideReceipt,
    LucideMail,
  ],
  templateUrl: './terms-page.component.html',
})
export class TermsPageComponent {
  readonly terms = [
    {
      number: '§1',
      icon: 'users',
      titleKey: 'footer.terms.sections.platform.title',
      contentKey: 'footer.terms.sections.platform.content',
    },
    {
      number: '§2',
      icon: 'user-check',
      titleKey: 'footer.terms.sections.registration.title',
      contentKey: 'footer.terms.sections.registration.content',
    },
    {
      number: '§3',
      icon: 'credit-card',
      titleKey: 'footer.terms.sections.payment.title',
      contentKey: 'footer.terms.sections.payment.content',
    },
    {
      number: '§4',
      icon: 'receipt',
      titleKey: 'footer.terms.sections.disputes.title',
      contentKey: 'footer.terms.sections.disputes.content',
    },
    {
      number: '§5',
      icon: 'circle-dollar',
      titleKey: 'footer.terms.sections.refund.title',
      contentKey: 'terms.sections.refund.content',
    },
    {
      number: '§6',
      icon: 'shield',
      titleKey: 'footer.terms.sections.liability.title',
      contentKey: 'footer.terms.sections.liability.content',
    },
  ];
}
