import { Component } from '@angular/core';
import {
  LucideBadgeDollarSign,
  LucideHandshake,
  LucideMapPin,
  LucideShieldCheck,
  LucideSearch,
  LucideUser,
} from '@lucide/angular';
import { heroFeatures } from '../../../shared/constants/homedata';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { HeroTextComponent } from '../../../shared/components/borvi/hero-text.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    HeroTextComponent,
    TranslatePipe,
    LucideShieldCheck,
    LucideBadgeDollarSign,
    LucideSearch,
    LucideUser,
    LucideHandshake,
    LucideMapPin,
  ],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  readonly heroFeatures = heroFeatures;

  scrollToCategories(): void {
    document
      .getElementById('Categories')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAppDownload(): void {
    document
      .getElementById('AppDownload')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
