import { Component } from '@angular/core';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { HeroTextComponent } from '../../../shared/components/borvi/hero-text.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-steps-hero',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    HeroTextComponent,
    TranslatePipe,
  ],
  templateUrl: './steps-hero.component.html',
})
export class StepsHeroComponent {}
