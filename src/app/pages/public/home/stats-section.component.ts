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
      value: '',
      label: 'home.stats.community',
      icon: 'users' as const,
    },
    {
      value: '',
      label: 'home.stats.selection',
      icon: 'package' as const,
    },
    {
      value: '',
      label: 'home.stats.rentals',
      icon: 'layout-grid' as const,
    },
    {
      value: '',
      label: 'home.stats.secure',
      icon: 'star' as const,
    },
  ];
}
