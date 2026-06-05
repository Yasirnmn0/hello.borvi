import { Component } from '@angular/core';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-app-benefits',
  standalone: true,
  imports: [AppImageComponent, FadeInDirective, TranslatePipe],
  templateUrl: './app-benefits.component.html',
})
export class AppBenefitsComponent {
  readonly appBenefits = [
    {
      key: 'BROWSE',
      icon: 'browse',
      labelKey: 'HOW_IT_WORKS.APP_BENEFITS.BROWSE.TITLE',
      infoKey: 'HOW_IT_WORKS.APP_BENEFITS.BROWSE.INFO',
    },
    {
      key: 'AVAILABILITY',
      icon: 'availability',
      labelKey: 'HOW_IT_WORKS.APP_BENEFITS.AVAILABILITY.TITLE',
      infoKey: 'HOW_IT_WORKS.APP_BENEFITS.AVAILABILITY.INFO',
    },
    {
      key: 'BOOKINGS',
      icon: 'bookings',
      labelKey: 'HOW_IT_WORKS.APP_BENEFITS.BOOKINGS.TITLE',
      infoKey: 'HOW_IT_WORKS.APP_BENEFITS.BOOKINGS.INFO',
    },
    {
      key: 'OFFERS',
      icon: 'offers',
      labelKey: 'HOW_IT_WORKS.APP_BENEFITS.OFFERS.TITLE',
      infoKey: 'HOW_IT_WORKS.APP_BENEFITS.OFFERS.INFO',
    },
  ];
}
