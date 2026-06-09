import { Component } from '@angular/core';
import {
  LucideLayoutGrid,
  LucidePackage,
  LucideStar,
  LucideUsers,
} from '@lucide/angular';

import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [
    ContainerComponent,
    FadeInDirective,
    LucideUsers,
    LucidePackage,
    LucideLayoutGrid,
    LucideStar,
    TranslatePipe,
  ],
  templateUrl: './stats-section.component.html',
})
export class StatsSectionComponent {
  readonly stats = [
    {
      title: 'home.stats.community',
      description: 'home.stats.communityDesc',
      icon: 'users' as const,
    },
    {
      title: 'home.stats.selection',
      description: 'home.stats.selectionDesc',
      icon: 'package' as const,
    },
    {
      title: 'home.stats.rentals',
      description: 'home.stats.rentalsDesc',
      icon: 'layout-grid' as const,
    },
    {
      title: 'home.stats.secure',
      description: 'home.stats.secureDesc',
      icon: 'star' as const,
    },
  ];
}
