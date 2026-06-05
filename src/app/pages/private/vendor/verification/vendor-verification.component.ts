import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideLoader2 } from '@lucide/angular';
import { OnboardingStepperComponent } from '../../../../shared/components/vendor/onboarding-stepper.component';
import { VendorFileUploadComponent } from '../../../../shared/components/vendor/vendor-file-upload.component';
import { VendorPageShellComponent } from '../../../../shared/components/vendor/vendor-page-shell.component';
import { FadeInDirective } from '../../../../shared/components/borvi/fade-in.directive';
import { VendorAuthService } from '../../../../shared/services/vendor/vendor-auth.service';
import { VendorDataService } from '../../../../shared/services/vendor/vendor-data.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-vendor-verification',
  standalone: true,
  imports: [
    VendorPageShellComponent,
    OnboardingStepperComponent,
    VendorFileUploadComponent,
    LucideLoader2,
    TranslatePipe,
  ],
  templateUrl: './vendor-verification.component.html',
})
export class VendorVerificationComponent implements OnInit {
  private readonly data = inject(VendorDataService);
  private readonly router = inject(Router);
  
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly isReadOnly = signal(false);

  documentTypes: any[] = [];
  uploadedDocs = signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.data.getSeed().subscribe((seed) => {
      // Remove bank statement from document types
      this.documentTypes = seed.documentTypes.filter((dt: any) => dt.id !== 'bank_statement');
      
      const docs = this.data.getDocuments();
      const uploaded = new Set<string>();
      for (const doc of docs) {
        uploaded.add(doc.typeId);
      }
      this.uploadedDocs.set(uploaded);
    });

    inject(VendorAuthService).getCurrentUser().subscribe(res => {
      if (res.success && res.data) {
        const status = res.data.onboardingStatus;
        if (status === 'VerificationSubmitted' || status === 'Approved') {
          this.isReadOnly.set(true);
        } else {
          this.isReadOnly.set(false);
        }
      }
    });
  }

  onFileSelected(typeId: string, file: File): void {
    if (this.isReadOnly()) return;
    if (file) {
      this.data.saveDocument({
        typeId,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
      });
      const updated = new Set(this.uploadedDocs());
      updated.add(typeId);
      this.uploadedDocs.set(updated);
    }
  }

  onSubmit(): void {
    if (this.isReadOnly()) return;
    const required = this.documentTypes.filter((dt) => dt.required).map((dt) => dt.id);
    this.saving.set(true);
    this.error.set(null);

    // Implementation using subscription as per replace block requirement
    this.data.submitVerification(required).subscribe({
      next: (res: any) => {
        this.saving.set(false);
        if (res.success) {
          this.router.navigate(['/vendor/approval']);
        } else {
          this.error.set(res.message || 'Verification failed');
        }
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Failed to submit verification');
      }
    });
  }
}
