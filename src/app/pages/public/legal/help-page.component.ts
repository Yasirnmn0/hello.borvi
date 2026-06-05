import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideMail,
  LucideCircleHelp,
  LucideMessageCircle,
  LucideArrowRight,
} from '@lucide/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    LucideMail,
    LucideCircleHelp,
    LucideMessageCircle,
    LucideArrowRight,
  ],
  templateUrl: './help-page.component.html',
})
export class HelpPageComponent {}
