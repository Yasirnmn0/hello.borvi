import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowUpRight,
  LucideBot,
  LucideMessageSquareCode,
} from '@lucide/angular';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-contact-support-grid',
  standalone: true,
  imports: [
    AppImageComponent,
    FadeInDirective,
    LucideMessageSquareCode,
    LucideBot,
    LucideArrowUpRight,
    TranslatePipe,
  ],
  templateUrl: './contact-support-grid.component.html',
})
export class ContactSupportGridComponent {
  private readonly router = inject(Router);

  exploreEquipment(): void {
    void this.router.navigate(['/'], { fragment: 'Categories' });
  }
}
