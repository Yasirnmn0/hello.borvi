import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LucidePlus, LucideTrash2, LucidePackage } from '@lucide/angular';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { TranslationService } from '../../../../core/services/translation.service';
import { VendorDataService } from '../../../../shared/services/vendor/vendor-data.service';
import { VendorProduct } from '../../../../shared/models/vendor/vendor.models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-vendor-products',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe,
    FadeInDirective,
    VendorPageShellComponent,
    LucidePlus,
    LucideTrash2,
    LucidePackage,
    TranslatePipe,
  ],
  templateUrl: './vendor-products.component.html',
})
export class VendorProductsComponent {
  private readonly data = inject(VendorDataService);
  private readonly i18n = inject(TranslationService);
  products: VendorProduct[] = [];
  categoryLabels = new Map<string, string>();

  constructor() {
    this.data.getSeed().subscribe((seed: any) => {
      seed.categories.forEach((c: any) => this.categoryLabels.set(c.id, c.label));
    });
    this.load();
  }

  load(): void {
    this.data.getProducts().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.products = res.data.items;
        }
      }
    });
  }

  conditionLabel(condition: string): string {
    const map: Record<string, string> = {
      Neu: 'new',
      'Wie neu': 'likeNew',
      Exzellent: 'excellent',
      Gut: 'good',
      Gebraucht: 'used',
      New: 'new',
      'Like new': 'likeNew',
      Excellent: 'excellent',
      Good: 'good',
      Used: 'used',
    };
    const id = map[condition] ?? 'good';
    return this.i18n.instant(`vendor.conditions.${id}`);
  }

  remove(id: string | number): void {
    if (confirm(this.i18n.instant('vendor.products.deleteConfirm'))) {
      this.data.deleteProduct(id.toString()).subscribe({
        next: () => {
          this.load();
        }
      });
    }
  }

  categoryLabel(id: string): string {
    return this.categoryLabels.get(id) ?? id;
  }
}
