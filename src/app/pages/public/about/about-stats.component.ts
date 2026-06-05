import { Component } from '@angular/core';
// import { LucideCalendar, LucideHammer, LucideMapPin, LucideUsers, } from '@lucide/angular';
import {
  LucideUsers,
  LucideSearch,
  LucideWallet,
  LucideShieldCheck,
} from '@lucide/angular';
import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-about-stats',
  standalone: true,
  imports: [
    ContainerComponent,
    FadeInDirective,
    LucideUsers,
    LucideSearch,
    LucideWallet,
    LucideShieldCheck,
    TranslatePipe,
  ],
  templateUrl: './about-stats.component.html',
})
export class AboutStatsComponent {
  readonly platformStats = [
    {
      icon: 'users' as const,
      key: 'community',
    },
    {
      icon: 'search' as const,
      key: 'discover',
    },
    {
      icon: 'wallet' as const,
      key: 'save',
    },
    {
      icon: 'shield-check' as const,
      key: 'secure',
    },
  ];
}
