import { Component } from '@angular/core';
import { LucideAward, LucideCalendarDays, LucideUsers2 } from '@lucide/angular';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    LucideUsers2,
    LucideAward,
    LucideCalendarDays,
    TranslatePipe,
  ],
  templateUrl: './our-story.component.html',
})
export class OurStoryComponent {
  readonly highlights = [
    {
      icon: 'users' as const,
      key: 'community',
    },
    {
      icon: 'award' as const,
      key: 'save',
    },
    {
      icon: 'calendar' as const,
      key: 'resources',
    },
  ];
}
