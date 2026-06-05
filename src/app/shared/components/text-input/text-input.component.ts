import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MATERIAL, SHARED_MODULES } from '../../../pages/public-api';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [MATERIAL, SHARED_MODULES, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class InputTextComponent implements OnChanges {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() selectControl: FormControl = new FormControl();
  @Input() isRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hint: string = '';
  @Input() showHideEye: boolean = false;
  @Input() autocomplete: string = '';
  @Input() inputName: string = '';

  value: any = '';
  isPasswordVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      if (this.disabled) {
        this.selectControl.disable();
      } else {
        this.selectControl.enable();
      }
    }
  }

  writeValue(value: any): void {
    this.value = value ?? '';
    if (this.isRequired) {
      this.selectControl.setValidators([Validators.required]);
    } else {
      this.selectControl.clearValidators();
    }
    this.selectControl.updateValueAndValidity();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Handle input event
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
  }

  // Clear the input field
  clearInput(): void {
    this.value = '';
    this.selectControl.setValue('');
    if (this.showHideEye && this.type === 'password') {
      this.isPasswordVisible = false; // reset to hidden when cleared
    }
  }

  // Toggle show/hide password
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Computed type for password toggle
 get inputType(): string {
    if (this.showHideEye && this.type === 'password') {
      return this.isPasswordVisible ? 'text' : 'password';
    }
    return this.type;
  }
}
