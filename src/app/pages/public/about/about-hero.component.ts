import { Component } from '@angular/core';
import {
  LucideUsers,
  LucideMapPin,
  LucideWallet,
  LucideShieldCheck,
} from '@lucide/angular';

import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { HeroTextComponent } from '../../../shared/components/borvi/hero-text.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
@Component({
  selector: 'app-about-hero',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    HeroTextComponent,
    LucideUsers,
    LucideMapPin,
    LucideWallet,
    LucideShieldCheck,
    TranslatePipe,
  ],
  templateUrl: './about-hero.component.html',
})
export class AboutHeroComponent {
  readonly valueFeatures = [
    {
      icon: 'Users' as const,
      key: 'trusted',
    },
    {
      icon: 'MapPin' as const,
      key: 'nearby',
    },
    {
      icon: 'Wallet' as const,
      key: 'affordable',
    },
    {
      icon: 'ShieldCheck' as const,
      key: 'safe',
    },
  ];
}
