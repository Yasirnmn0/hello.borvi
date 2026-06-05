import { Component } from '@angular/core';
import { AppImageComponent } from '../../../shared/components/borvi/app-image.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-steps-grid',
  standalone: true,
  imports: [AppImageComponent, FadeInDirective, TranslatePipe],
  templateUrl: './steps-grid.component.html',
})
export class StepsGridComponent {
  readonly processSteps = [
    {
      stepNum: '1',
      titleKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP1.TITLE',
      descKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP1.DESC',
      imgSrc: '/images/HowItWorks/step-1.png',
    },
    {
      stepNum: '2',
      titleKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP2.TITLE',
      descKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP2.DESC',
      imgSrc: '/images/HowItWorks/step-2.png',
    },
    {
      stepNum: '3',
      titleKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP3.TITLE',
      descKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP3.DESC',
      imgSrc: '/images/HowItWorks/step-3.png',
    },
    {
      stepNum: '4',
      titleKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP4.TITLE',
      descKey: 'HOW_IT_WORKS.STEPS.ITEMS.STEP4.DESC',
      imgSrc: '/images/HowItWorks/step-4.png',
    },
  ];
}
