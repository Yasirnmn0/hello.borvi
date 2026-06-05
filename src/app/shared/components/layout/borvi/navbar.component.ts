import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDownload, LucideMenu } from '@lucide/angular';
import { AppImageComponent } from '../../borvi/app-image.component';
import { ContainerComponent } from '../../borvi/container.component';
import { LanguageSelectorComponent } from './language-selector.component';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AppImageComponent,
    ContainerComponent,
    LanguageSelectorComponent,
    LucideDownload,
    LucideMenu,
    TranslatePipe,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly open = signal(false);

  readonly navItems = [
    { titleKey: 'nav.home', href: '/' },
    { titleKey: 'nav.about', href: '/about' },
    { titleKey: 'nav.howItWorks', href: '/how-it-works' },
    { titleKey: 'nav.contact', href: '/contact' },
  ];

  closeMenu(): void {
    this.open.set(false);
  }
}
