import { Component } from '@angular/core';
import { steps } from '../../../shared/constants/homedata';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { SectionHeadingComponent } from '../../../shared/components/borvi/section-heading.component';
import { LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'app-how-it-works-preview',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    TranslatePipe,
    SectionHeadingComponent,
    LucideArrowRight,
  ],
  templateUrl: './how-it-works-preview.component.html',
})
export class HowItWorksPreviewComponent {
  readonly steps = steps;
}
