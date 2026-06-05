import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideClock,
  LucideMail,
  LucideMapPin,
  LucidePhone,
} from '@lucide/angular';
import {
  categoryItems,
  footerNavItems,
  supportItems,
} from '../../../constants/footer-data';
import { AppImageComponent } from '../../borvi/app-image.component';
import { ContainerComponent } from '../../borvi/container.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    AppImageComponent,
    ContainerComponent,
    TranslatePipe,
    LucidePhone,
    LucideMail,
    LucideMapPin,
    LucideClock,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly footerNavItems = footerNavItems;
  readonly categoryItems = categoryItems;
  readonly supportItems = supportItems;
}
