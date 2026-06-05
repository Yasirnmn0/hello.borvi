import { Component, inject } from '@angular/core';
import { TranslationService, AppLanguage } from '../../../../core/services/translation.service';

/** Language toggle for vendor portal header (light background) */
@Component({
  selector: 'app-language-selector-vendor',
  standalone: true,
  template: `
    <div class="flex items-center bg-[#f3f4f6] rounded-xl p-1 border border-[#e5e7eb]">
      @for (code of languages; track code) {
        <button
          type="button"
          (click)="changeLanguage(code)"
          [class]="buttonClass(code)"
        >
          {{ code.toUpperCase() }}
        </button>
      }
    </div>
  `,
})
export class LanguageSelectorVendorComponent {
  private readonly i18n = inject(TranslationService);

  readonly languages: AppLanguage[] = ['en', 'de'];

  buttonClass(code: AppLanguage): string {
    const active = this.i18n.lang() === code;
    return `px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
      active ? 'bg-[#0d7a52] text-white shadow-sm' : 'text-gray-500 hover:text-[#0d7a52]'
    }`;
  }

  changeLanguage(code: AppLanguage): void {
    if (this.i18n.lang() === code) return;
    this.i18n.setLanguage(code).subscribe();
  }
}
