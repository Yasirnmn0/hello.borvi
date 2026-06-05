import { Component, Input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideLoader2, LucideSave } from '@lucide/angular';
import { FadeInDirective } from '../borvi/fade-in.directive';

@Component({
  selector: 'app-vendor-form-actions',
  standalone: true,
  imports: [RouterLink, FadeInDirective, LucideSave, LucideArrowRight, LucideLoader2],
  template: `
    <div class="vp-actions" appFadeIn [delay]="400" [y]="12">
      @if (successMessage) {
        <p class="vp-actions__success" role="status">
          <span class="vp-actions__check">✓</span>
          {{ successMessage }}
        </p>
      }
      <div class="vp-actions__buttons">
        <button
          type="submit"
          [disabled]="loading"
          class="vp-btn vp-btn--primary"
        >
          @if (loading) {
            <svg lucideLoader2 class="vp-btn__spin" [size]="18"></svg>
          } @else {
            <svg lucideSave [size]="18"></svg>
          }
          {{ submitLabel }}
        </button>
        @if (secondaryRoute) {
          <a [routerLink]="secondaryRoute" class="vp-btn vp-btn--secondary">
            {{ secondaryLabel }}
            <svg lucideArrowRight [size]="18"></svg>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: './vendor-form-actions.component.scss',
})
export class VendorFormActionsComponent {
  @Input() submitLabel = 'Speichern';
  @Input() secondaryLabel = 'Weiter';
  @Input() secondaryRoute = '';
  @Input() loading = false;
  @Input() successMessage = '';
}
