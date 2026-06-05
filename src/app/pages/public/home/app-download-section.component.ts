import { Component } from '@angular/core';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
@Component({
  selector: 'app-app-download-section',
  standalone: true,
  imports: [
    ContainerComponent,
    AppImageComponent,
    FadeInDirective,
    TranslatePipe,
  ],
  templateUrl: './app-download-section.component.html',
})
export class AppDownloadSectionComponent {}
