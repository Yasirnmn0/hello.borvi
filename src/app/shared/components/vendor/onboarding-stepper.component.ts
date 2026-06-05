import { Component, Input } from '@angular/core';
import { LucideCheck } from '@lucide/angular';
import { FadeInDirective } from '../borvi/fade-in.directive';

@Component({
  selector: 'app-onboarding-stepper',
  standalone: true,
  imports: [LucideCheck, FadeInDirective],
  templateUrl: './onboarding-stepper.component.html',
})
export class OnboardingStepperComponent {
  @Input() activeStepId = '';

  readonly steps = [
    { id: 'AccountCreated', label: 'Account', icon: 'user' },
    { id: 'ProfileCompleted', label: 'Profile', icon: 'file-text' },
    { id: 'BusinessInfoSubmitted', label: 'Business', icon: 'store' },
    { id: 'VerificationSubmitted', label: 'Verification', icon: 'shield-check' },
    { id: 'Approved', label: 'Approved', icon: 'check-circle' },
  ];

  isActive(stepId: string): boolean {
    const currentStatus = this.activeStepId;
    const statusOrder = ['AccountCreated', 'ProfileCompleted', 'BusinessInfoSubmitted', 'VerificationSubmitted', 'Approved'];
    
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepId);
    
    return stepIndex <= currentIndex;
  }

  isCurrent(stepId: string): boolean {
    return this.activeStepId === stepId;
  }

  isComplete(stepId: string): boolean {
    const statusOrder = ['AccountCreated', 'ProfileCompleted', 'BusinessInfoSubmitted', 'VerificationSubmitted', 'Approved'];
    const currentIndex = statusOrder.indexOf(this.activeStepId);
    const stepIndex = statusOrder.indexOf(stepId);
    return stepIndex < currentIndex;
  }

  overallProgress(): number {
    const statusOrder = ['AccountCreated', 'ProfileCompleted', 'BusinessInfoSubmitted', 'VerificationSubmitted', 'Approved'];
    const currentIndex = statusOrder.indexOf(this.activeStepId);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  }

  getCircleClass(stepId: string): string {
    if (this.isComplete(stepId)) return 'vp-stepper__circle--complete';
    if (this.isCurrent(stepId)) return 'vp-stepper__circle--current';
    return 'vp-stepper__circle--locked';
  }
}
