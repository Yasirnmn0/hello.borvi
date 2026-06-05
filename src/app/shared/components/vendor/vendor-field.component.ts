import { Component, Input, OnInit, Optional, Self, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FadeInDirective } from '../borvi/fade-in.directive';
import { TranslationService } from '../../../core/services/translation.service';

export type VendorFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'date';

export interface VendorSelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-vendor-field',
  standalone: true,
  imports: [ReactiveFormsModule, FadeInDirective],
  templateUrl: './vendor-field.component.html',
  styleUrl: './vendor-field.component.scss',
})
export class VendorFieldComponent implements ControlValueAccessor, OnInit {
  private readonly i18n = inject(TranslationService);

  @Input() label = '';
  @Input() type: VendorFieldType = 'text';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() icon = '';
  @Input() rows = 4;
  @Input() options: VendorSelectOption[] = [];
  @Input() autocomplete = '';
  @Input() inputId = '';
  @Input() animationDelay = 0;
  @Input() min?: number;
  @Input() max?: number;

  /** When parent passes formControl directly instead of formControlName */
  @Input() control?: FormControl;

  value = '';
  disabled = false;
  focused = false;
  touched = false;

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl | null) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  get fc(): FormControl | null {
    if (this.control) return this.control;
    return (this.ngControl?.control as FormControl) ?? null;
  }

  get id(): string {
    return this.inputId || `vf-${this.label.replace(/\s/g, '-').toLowerCase()}`;
  }

  get required(): boolean {
    return !!this.fc?.hasValidator(Validators.required);
  }

  get showError(): boolean {
    const c = this.fc;
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  get errorMessage(): string {
    this.i18n.lang();
    const c = this.fc;
    if (!c?.errors) return '';
    if (c.errors['required']) {
      return this.i18n.instant('validation.required', { field: this.label });
    }
    if (c.errors['email']) return this.i18n.instant('validation.email');
    if (c.errors['minlength']) {
      return this.i18n.instant('validation.minLength', {
        min: c.errors['minlength'].requiredLength,
      });
    }
    if (c.errors['min']) {
      return this.i18n.instant('validation.minValue', { min: c.errors['min'].min });
    }
    return this.i18n.instant('validation.invalid');
  }

  get filled(): boolean {
    return String(this.fc?.value ?? this.value ?? '').length > 0;
  }

  onFocus(): void {
    this.focused = true;
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
    this.fc?.markAsTouched();
  }

  onInput(event: Event): void {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    let val: string | number = el.value;
    if (this.type === 'number' && el.value !== '') {
      val = Number(el.value);
    }
    this.value = String(el.value);
    this.onChange(val as string);
    this.fc?.setValue(val, { emitEvent: false });
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
