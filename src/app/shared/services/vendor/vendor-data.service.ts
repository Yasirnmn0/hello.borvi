import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ApiUrls } from '../../enums/api-urls';
import { environment } from '../../../../environments/environment';
import { VendorAuthService } from './vendor-auth.service';
import { VendorStorageConstant } from '../../constants/vendor-storage.constant';
import { VendorDocument } from '../../models/vendor/vendor.models';

@Injectable({ providedIn: 'root' })
export class VendorDataService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private auth = inject(VendorAuthService);

  getSeed(): Observable<any> {
    return this.http.get('/assets/data/vendor-seed.json');
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ApiUrls.PRODUCTS_VENDOR}`);
  }

  saveProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.PRODUCTS_ADD}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ApiUrls.PRODUCTS_ADD}/${id}`);
  }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ApiUrls.PRODUCTS_VENDOR_STATS}`).pipe(
        map((res: any) => res.data)
    );
  }

  // --- Onboarding Business Methods ---
  getBusiness(): Observable<any> {
    return this.auth.getCurrentUser().pipe(
      map(res => {
        if (res.success && res.data) {
          return {
            businessName: res.data.businessName,
            businessType: res.data.businessType,
            businessRegistrationNumber: res.data.businessRegistrationNumber,
            businessAddress: res.data.businessAddress
          };
        }
        return null;
      })
    );
  }

  saveBusiness(business: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_UPDATE_BUSINESS}`, business).pipe(
      tap(() => this.auth.setOnboardingStatus('BusinessInfoSubmitted'))
    );
  }

  // --- Onboarding Documents Methods ---
  getDocuments(): VendorDocument[] {
    const raw = localStorage.getItem(VendorStorageConstant.Documents);
    return raw ? JSON.parse(raw) : [];
  }

  saveDocument(doc: VendorDocument): void {
    const docs = this.getDocuments().filter(d => d.typeId !== doc.typeId);
    docs.push(doc);
    localStorage.setItem(VendorStorageConstant.Documents, JSON.stringify(docs));
  }

  submitVerification(requiredTypeIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ApiUrls.AUTH_SUBMIT_VERIFICATION}`, {}).pipe(
      tap(() => this.auth.setOnboardingStatus('VerificationSubmitted'))
    );
  }

  simulateApproval(approve: boolean): void {
    this.auth.setOnboardingStatus(approve ? 'Approved' : 'Rejected');
  }
}
