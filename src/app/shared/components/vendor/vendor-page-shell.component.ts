import { Component, Input } from '@angular/core';
import { FadeInDirective } from '../borvi/fade-in.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-vendor-page-shell',
  standalone: true,
  imports: [FadeInDirective, TranslatePipe],
  templateUrl: './vendor-page-shell.component.html',
  styleUrl: './vendor-page-shell.component.scss',
})
export class VendorPageShellComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() step = 0;
  @Input() stepLabel = '';
  @Input() maxWidth: 'md' | 'lg' | 'xl' = 'lg';
}
