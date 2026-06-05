import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export type AppLanguage = 'de' | 'en';

const STORAGE_KEY = 'borvi_lang';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);

  /** Current language – read in templates/pipes to trigger updates */
  readonly lang = signal<AppLanguage>(this.getStoredLang());

  private readonly dictionary = signal<Record<string, unknown>>({});

  getStoredLang(): AppLanguage {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'de' ? stored : 'de';
  }

  load(lang?: AppLanguage): Observable<Record<string, unknown>> {
    const target = lang ?? this.lang();
    return this.http.get<Record<string, unknown>>(`/assets/i18n/${target}.json`).pipe(
      tap((data) => {
        this.dictionary.set(data);
        this.lang.set(target);
        localStorage.setItem(STORAGE_KEY, target);
        document.documentElement.lang = target;
      })
    );
  }

  setLanguage(lang: AppLanguage): Observable<Record<string, unknown>> {
    return this.load(lang);
  }

  instant(key: string, params?: Record<string, string | number>): string {
    const raw = this.resolve(key, this.dictionary());
    let text = typeof raw === 'string' ? raw : key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
      });
    }
    return text;
  }

  private resolve(key: string, obj: Record<string, unknown>): unknown {
    return key.split('.').reduce<unknown>((acc, part) => {
      if (acc && typeof acc === 'object' && part in (acc as object)) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  }
}
