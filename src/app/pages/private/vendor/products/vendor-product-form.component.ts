import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideImage } from '@lucide/angular';
import { TranslationService } from '../../../../core/services/translation.service';
import { VendorFieldComponent, VendorSelectOption } from '../../../../shared/components/vendor/vendor-field.component';
import { VendorFormActionsComponent } from '../../../../shared/components/vendor/vendor-form-actions.component';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { VendorDataService } from '../../../../shared/services/vendor/vendor-data.service';

@Component({
  selector: 'app-vendor-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    VendorFieldComponent,
    VendorFormActionsComponent,
    VendorPageShellComponent,
    FadeInDirective,
    LucideImage,
    TranslatePipe,
  ],
  templateUrl: './vendor-product-form.component.html',
})
export class VendorProductFormComponent implements OnInit {
  private readonly data = inject(VendorDataService);
  private readonly router = inject(Router);
  private readonly i18n = inject(TranslationService);

  categoryOptions: VendorSelectOption[] = [];
  conditionOptions: VendorSelectOption[] = [];
  statusOptions: VendorSelectOption[] = [];
  imageNames: string[] = [];
  readonly saving = signal(false);

  readonly form = new FormGroup({
    title: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(20)]),
    condition: new FormControl('', Validators.required),
    dailyPrice: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    weeklyPrice: new FormControl<number | null>(null),
    deposit: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    status: new FormControl('draft'),
  });

  ngOnInit(): void {
    this.statusOptions = [
      { value: 'draft', label: this.i18n.instant('vendor.productForm.statusDraft') },
      { value: 'published', label: this.i18n.instant('vendor.productForm.statusPublished') },
    ];
    this.data.getSeed().subscribe((seed: any) => {
      this.categoryOptions = seed.categories.map((c: any) => ({
        value: c.id,
        label: this.i18n.instant(`vendor.categories.${c.id}`),
      }));
      this.conditionOptions = seed.conditions.map((c: any, i: number) => ({
        value: c,
        label: this.i18n.instant(
          `vendor.conditions.${['new', 'likeNew', 'excellent', 'good', 'used'][i] ?? 'good'}`
        ),
      }));
      if (seed.conditions.length) {
        this.form.patchValue({ condition: seed.conditions[0] });
      }
    });
    this.i18n.lang();
  }

  onImages(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;
    this.imageNames = Array.from(files).map((f) => f.name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const raw = this.form.getRawValue();
    
    const productDto = {
      name: raw.title!,
      description: raw.description!,
      price: Number(raw.dailyPrice),
      stockQuantity: Number(raw.quantity),
      condition: raw.condition!,
      isAvailable: raw.status === 'published',
      imageUrls: this.imageNames.length ? this.imageNames : ['https://via.placeholder.com/150'],
    };

    this.data.saveProduct(productDto).subscribe({
      next: (res) => {
        this.saving.set(false);
        if (res.success) {
          this.router.navigate(['/vendor/products']);
        }
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}
