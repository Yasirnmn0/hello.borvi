import { Component, signal } from '@angular/core';
import {
  LucideChevronDown,
  LucideCircleHelp,
  LucideMail,
  LucidePackage,
  LucideUsers,
  LucideCreditCard,
  LucideCalendarDays,
  LucideShieldCheck,
  LucideUserPlus,
} from '@lucide/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [
    LucideChevronDown,
    LucideCircleHelp,
    LucideMail,
    LucidePackage,
    LucideUsers,
    LucideCreditCard,
    LucideCalendarDays,
    LucideShieldCheck,
    LucideUserPlus,
    TranslatePipe,
  ],
  templateUrl: './faq-page.component.html',
})
export class FaqPageComponent {
  readonly openIndex = signal<number | null>(0);

  readonly faqs = [
    {
      icon: 'package',
      question: 'footer.FAQ.ITEM1.QUESTION',
      answer: 'footer.FAQ.ITEM1.ANSWER',
    },
    {
      icon: 'users',
      question: 'footer.FAQ.ITEM2.QUESTION',
      answer: 'footer.FAQ.ITEM2.ANSWER',
    },
    {
      icon: 'credit-card',
      question: 'footer.FAQ.ITEM3.QUESTION',
      answer: 'footer.FAQ.ITEM3.ANSWER',
    },
    {
      icon: 'calendar',
      question: 'footer.FAQ.ITEM4.QUESTION',
      answer: 'footer.FAQ.ITEM4.ANSWER',
    },
    {
      icon: 'shield',
      question: 'footer.FAQ.ITEM5.QUESTION',
      answer: 'footer.FAQ.ITEM5.ANSWER',
    },
    {
      icon: 'user-plus',
      question: 'footer.FAQ.ITEM6.QUESTION',
      answer: 'footer.FAQ.ITEM6.ANSWER',
    },
    {
      icon: 'mail',
      question: 'footer.FAQ.ITEM7.QUESTION',
      answer: 'footer.FAQ.ITEM7.ANSWER',
    },
  ];

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}
