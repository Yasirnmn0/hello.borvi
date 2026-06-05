import { Component } from '@angular/core';
import { LucideHandshake, LucideShieldCheck, LucideZap } from '@lucide/angular';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { HeroTextComponent } from '../../../shared/components/borvi/hero-text.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-contact-hero',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    HeroTextComponent,
    LucideHandshake,
    LucideZap,
    LucideShieldCheck,
    TranslatePipe,
  ],
  templateUrl: './contact-hero.component.html',
})
export class ContactHeroComponent {}
