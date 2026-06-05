import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-report-date-picker',
  standalone: true,
  imports: [ReactiveFormsModule, DateInputsModule],
  templateUrl: './report-date-picker.component.html',
  styleUrls: ['./report-date-picker.component.scss'],
})
export class ReportDatePickerComponent {
  @Input() label = '';
  @Input() dateControl: FormControl = new FormControl();
  @Input() isRequired = false;
  @Input() placeholder = 'YYYY-MM-DD';
  @Input() format = 'yyyy-MM-dd';
}
