import { Component } from '@angular/core';
import {
  LucideBuilding2,
  LucideMail,
  LucideUser,
  LucideMapPin,
} from '@lucide/angular';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-impressum-page',
  standalone: true,
  imports: [
    LucideBuilding2,
    LucideMail,
    LucideUser,
    LucideMapPin,
    TranslatePipe,
  ],
  templateUrl: './impressum-page.component.html',
})
export class ImpressumPageComponent {}
