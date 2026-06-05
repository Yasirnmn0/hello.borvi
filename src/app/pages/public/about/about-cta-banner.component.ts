import { Component } from '@angular/core';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
@Component({
  selector: 'app-about-cta-banner',
  standalone: true,
  imports: [AppImageComponent, FadeInDirective, TranslatePipe],
  templateUrl: './about-cta-banner.component.html',
})
export class AboutCtaBannerComponent {}
