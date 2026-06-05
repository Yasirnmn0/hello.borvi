import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gridtable',
  standalone: true,
  imports: [GridModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './gridtable.component.html',
  styleUrls: ['./gridtable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridtableComponent {
  @Input() gridData: any[] = [];
  @Input() gridColumns: any[] = [];
  @Input() actions: string[] = [];
  @Input() showCheckboxes: boolean = false;
  @Input() selectedItems: any[] = [];
  @Output() editRole = new EventEmitter<any>();
  @Output() deleteRole = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();

  skip = 0;
  pageSize = 10;

  pageChange(event: any) {
    this.skip = event.skip;
  }

  onEdit(dataItem: any) {
    this.editRole.emit(dataItem);
  }

  onDelete(dataItem: any) {
    this.deleteRole.emit(dataItem);
  }

  // Universal selection method that works with any data structure
  isSelected(item: any): boolean {
    if (!item) return false;
    return this.selectedItems.some(selectedItem => this.itemsAreEqual(selectedItem, item));
  }

  onCheckboxChange(item: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    
    if (!item) return;
    
    let newSelection: any[];
    
    if (checked) {
      // Add to selected items if not already present
      if (!this.isSelected(item)) {
        newSelection = [...this.selectedItems, item];
      } else {
        newSelection = [...this.selectedItems]; // No change if already selected
      }
    } else {
      // Remove from selected items
      newSelection = this.selectedItems.filter(selectedItem => 
        !this.itemsAreEqual(selectedItem, item)
      );
    }
    
    // Update the selectedItems array
    this.selectedItems = newSelection;
    // Emit the new selection
    this.selectionChange.emit(newSelection);
  }

  // Helper method to compare items properly
  private itemsAreEqual(item1: any, item2: any): boolean {
    // First try screenId (for screens)
    if (item1.screenId && item2.screenId) {
      return item1.screenId === item2.screenId;
    }
    // Then try id (generic)
    if (item1.id && item2.id) {
      return item1.id === item2.id;
    }
    // Fallback to reference equality
    return item1 === item2;
  }

  // Method to apply status styling
  getStatusClass(status: string): string {
    if (status?.toLowerCase() === 'active') {
      return 'status-active';
    } else if (status?.toLowerCase() === 'inactive') {
      return 'status-inactive';
    }
    return '';
  }

  // Check if column is status column
  isStatusColumn(field: string): boolean {
    return field?.toLowerCase().includes('status');
  }
}