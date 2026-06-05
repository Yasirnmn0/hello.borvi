import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from '../services/translation.service';

export function initTranslations(): () => Promise<void> {
  return () => {
    const translation = inject(TranslationService);
    return firstValueFrom(translation.load(translation.getStoredLang())).then(() => undefined);
  };
}
