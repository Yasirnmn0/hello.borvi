import { Component, EventEmitter, HostBinding, Input, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MATERIAL, SHARED_MODULES } from '../../../pages/public-api';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MATERIAL, SHARED_MODULES, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [],
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Input() selectControl: FormControl = new FormControl();
  @Input() isRequired: boolean = false;
  @Input() multiSelect: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hint: string = '';
  @Input() groupBy: boolean = false;
  @Input() optionValue: string = 'value';
  @Input() optionViewValue: string = 'viewValue';
  @Input() placeholder: string = '';
  /** Optional class applied to the opened select panel. */
  @Input() panelClass: string | string[] = '';
  /** Report filter bar styling (56px height, matches report date picker). */
  @Input() reportStyle = false;

  @HostBinding('class.report-select-host')
  get reportSelectHostClass(): boolean {
    return this.reportStyle;
  }

  @Output() valueChange = new EventEmitter<any>();
  /** Full Material select event (includes `source` for which option was toggled). */
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  constructor() { }

  ngOnInit(): void {
    // Apply validators dynamically
    if (this.isRequired) {
      this.selectControl.setValidators([Validators.required]);
    } else {
      this.selectControl.clearValidators();
    }

    // Handle disabled state dynamically
    if (this.disabled) {
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
    }

    this.selectControl.updateValueAndValidity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRequired']) {
      if (this.isRequired) {
        this.selectControl.setValidators([Validators.required]);
      } else {
        this.selectControl.clearValidators();
      }
      this.selectControl.updateValueAndValidity();
    }
    if (changes['disabled']) {
      if (this.disabled) {
        this.selectControl.disable({ emitEvent: false });
      } else {
        this.selectControl.enable({ emitEvent: false });
      }
    }
  }

  onValueChange($event: MatSelectChange): void {
    this.valueChange.emit($event.value);
    this.selectionChange.emit($event);
  }

  get hasMultiSelection(): boolean {
    const v = this.selectControl.value;
    return Array.isArray(v) && v.length > 0;
  }

  get multiSelectTriggerLabel(): string {
    if (!this.multiSelect) {
      return '';
    }
    const selected: unknown[] = Array.isArray(this.selectControl.value) ? this.selectControl.value : [];
    if (!selected.length) {
      return this.placeholder || '';
    }
    const labels = selected
      .map((val) => this.options.find((o) => o[this.optionValue] === val)?.[this.optionViewValue])
      .filter((label): label is string => !!label);
    if (!labels.length) {
      return `${selected.length} selected`;
    }
    if (labels.length <= 2) {
      return labels.join(', ');
    }
    return `${labels.length} selected`;
  }

  // Get the options for a specific group (if grouping is enabled)
  getOptionsByGroup(group: string): { value: string; viewValue: string }[] {
    return this.options
      .filter((option) => option.group === group)
      .map((option) => ({ value: option.value, viewValue: option.viewValue }));
  }
}
