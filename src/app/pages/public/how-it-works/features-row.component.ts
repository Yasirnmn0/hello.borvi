import { Component } from '@angular/core';
import {
  LucideCalendarRange,
  LucideShieldCheck,
  LucideSearch,
  LucideUsers,
} from '@lucide/angular';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-features-row',
  standalone: true,
  imports: [
    FadeInDirective,
    LucideShieldCheck,
    LucideCalendarRange,
    LucideSearch,
    LucideUsers,
    TranslatePipe,
  ],
  templateUrl: './features-row.component.html',
})
export class FeaturesRowComponent {
  readonly miniHighlights = [
    {
      icon: 'search' as const,
      labelKey: 'HOW_IT_WORKS.FEATURES.ROW.SEARCH.TITLE',
      infoKey: 'HOW_IT_WORKS.FEATURES.ROW.SEARCH.INFO',
    },
    {
      icon: 'shield' as const,
      labelKey: 'HOW_IT_WORKS.FEATURES.ROW.SHIELD.TITLE',
      infoKey: 'HOW_IT_WORKS.FEATURES.ROW.SHIELD.INFO',
    },
    {
      icon: 'calendar' as const,
      labelKey: 'HOW_IT_WORKS.FEATURES.ROW.CALENDAR.TITLE',
      infoKey: 'HOW_IT_WORKS.FEATURES.ROW.CALENDAR.INFO',
    },
    {
      icon: 'users' as const,
      labelKey: 'HOW_IT_WORKS.FEATURES.ROW.USERS.TITLE',
      infoKey: 'HOW_IT_WORKS.FEATURES.ROW.USERS.INFO',
    },
  ];
}
