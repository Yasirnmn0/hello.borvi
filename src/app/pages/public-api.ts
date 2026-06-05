//ANGULAR MATERIAL IMPORTS
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';

//Import Forms Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Forms Module
import { CommonModule } from '@angular/common';

export const MATERIAL = [
  MatExpansionModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionModule,
];

export const SHARED_MODULES = [
  ReactiveFormsModule,
  CommonModule,
  FormsModule
];

import { SelectComponent } from '../shared/components/select/select.component';
import { InputTextComponent } from '../shared/components/text-input/text-input.component';
import { NavBarComponent } from '../shared/components/navbar/navbar.component';
import { GridtableComponent } from '../shared/components/gridtable/gridtable.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ReportDatePickerComponent } from '../shared/components/report-date-picker/report-date-picker.component';

export const SHARED_COMPONENTS = [
  SelectComponent,
  InputTextComponent,
  NavBarComponent,
  GridtableComponent,
  LoaderComponent,
  ReportDatePickerComponent,
];
