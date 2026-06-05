import { Component } from '@angular/core';
import { steps } from '../../../shared/constants/homedata';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-how-it-works-preview',
  standalone: true,
  imports: [ContainerComponent, AppImageComponent, FadeInDirective, TranslatePipe],
  templateUrl: './how-it-works-preview.component.html',
})
export class HowItWorksPreviewComponent {
  readonly steps = steps;
}
