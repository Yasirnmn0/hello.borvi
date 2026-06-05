import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { LanguageSelectorComponent } from '../../../shared/components/layout/borvi/language-selector.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    AppImageComponent,
    ContainerComponent,
    FadeInDirective,
    LanguageSelectorComponent,
    TranslatePipe,
  ],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  readonly dots = Array.from({ length: 48 }, (_, i) => i);
  readonly highlightKeys = [
    'auth.layout.highlight1',
    'auth.layout.highlight2',
    'auth.layout.highlight3',
  ];
}
