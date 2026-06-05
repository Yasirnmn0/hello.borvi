import { Component, Input, output } from '@angular/core';
import { LucideFileCheck, LucideUpload } from '@lucide/angular';
import { FadeInDirective } from '../borvi/fade-in.directive';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-vendor-file-upload',
  standalone: true,
  imports: [FadeInDirective, LucideUpload, LucideFileCheck, TranslatePipe],
  template: `
    <div
      appFadeIn
      [delay]="animationDelay"
      [y]="16"
      [class]="'vp-file-card ' + (fileName ? 'vp-file-card--uploaded' : '')"
    >
      <div class="vp-file-card__head">
        <div>
          <p class="vp-file-card__title">
            {{ label }}
            @if (required) {
              <span class="text-red-500">*</span>
            }
          </p>
          @if (fileName) {
            <p class="vp-file-card__meta">
              <svg lucideFileCheck [size]="14"></svg>
              {{ fileName }}
            </p>
          } @else if (hint) {
            <p class="text-xs text-gray-500 mt-1">{{ hint }}</p>
          }
        </div>
        <label [class.opacity-50]="disabled" [class.pointer-events-none]="disabled" class="vp-upload-btn">
          <svg lucideUpload [size]="16"></svg>
          {{ fileName ? ('vendor.verification.replace' | translate) : ('vendor.verification.upload' | translate) }}
          <input type="file" [accept]="accept" [disabled]="disabled" (change)="onSelect($event)" />
        </label>
      </div>
    </div>
  `,
})
export class VendorFileUploadComponent {
  @Input() label = '';
  @Input() hint = 'PDF, JPG oder PNG';
  @Input() required = false;
  @Input() accept = '.pdf,.jpg,.jpeg,.png';
  @Input() fileName = '';
  @Input() animationDelay = 0;
  @Input() disabled = false;

  readonly fileSelected = output<File>();

  onSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
