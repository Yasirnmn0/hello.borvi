import { Component, inject } from '@angular/core';
import { TranslationService, AppLanguage } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  template: `
    <div class="flex items-center bg-white/10 rounded-xl p-1 border border-white/10">
      @for (code of languages; track code) {
        <button
          type="button"
          (click)="changeLanguage(code)"
          [class]="buttonClass(code)"
          [attr.aria-label]="code === 'de' ? 'Deutsch' : 'English'"
        >
          {{ code.toUpperCase() }}
        </button>
      }
    </div>
  `,
})
export class LanguageSelectorComponent {
  private readonly i18n = inject(TranslationService);

  readonly languages: AppLanguage[] = ['en', 'de'];

  buttonClass(code: AppLanguage): string {
    const active = this.i18n.lang() === code;
    return `px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
      active
        ? 'bg-[#0c7a4b] text-white shadow-sm'
        : 'text-white/60 hover:text-white'
    }`;
  }

  changeLanguage(code: AppLanguage): void {
    if (this.i18n.lang() === code) return;
    this.i18n.setLanguage(code).subscribe();
  }
}
