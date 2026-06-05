import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorAuthService } from '../../../shared/services/vendor/vendor-auth.service';
import { LucideX, LucideUser, LucideEye, LucideLoader2 } from '@lucide/angular';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LucideX, LucideUser, LucideEye, LucideLoader2, FadeInDirective],
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-6xl mx-auto">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h1 class="text-3xl font-black text-[#111827]">Vendor <span class="text-[#0d7a52]">Approvals</span></h1>
            <p class="text-gray-500">Review and manage vendor applications</p>
          </div>
          <button (click)="logout()" class="text-sm font-bold text-red-600 hover:text-red-700">Sign Out</button>
        </header>

        @if (loading()) {
          <div class="flex justify-center py-20">
            <svg lucideLoader2 class="animate-spin text-[#0d7a52]" [size]="40"></svg>
          </div>
        } @else {
          <div class="grid gap-4">
            @for (vendor of vendors(); track vendor.id) {
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between" appFadeIn>
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    @if (vendor.profilePictureUrl) {
                      <img [src]="vendor.profilePictureUrl" class="h-12 w-12 rounded-full object-cover">
                    } @else {
                      <svg lucideUser [size]="24"></svg>
                    }
                  </div>
                  <div>
                    <h3 class="font-bold text-[#111827]">{{ vendor.fullLegalName || 'Unnamed Vendor' }}</h3>
                    <p class="text-xs text-gray-500">{{ vendor.email }}</p>
                    <div class="flex items-center gap-2 mt-1">
                      <span [class]="getStatusClass(vendor.onboardingStatus)" class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {{ vendor.onboardingStatus }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button (click)="viewVendor(vendor)" class="p-2 text-gray-400 hover:text-[#0d7a52] transition-colors">
                    <svg lucideEye [size]="20"></svg>
                  </button>
                  @if (vendor.onboardingStatus === 'VerificationSubmitted') {
                    <button (click)="approve(vendor.id)" class="px-4 py-2 bg-[#0d7a52] text-white text-xs font-bold rounded-lg hover:bg-[#0a6342]">Approve</button>
                    <button (click)="promptReject(vendor.id)" class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700">Reject</button>
                  }
                </div>
              </div>
            } @empty {
              <div class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p class="text-gray-400 font-medium">No pending applications</p>
              </div>
            }
          </div>
        }
      </div>

      <!-- Detail Modal -->
      @if (selectedVendor()) {
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl" appFadeIn>
            <div class="flex justify-between items-start mb-6">
              <h2 class="text-2xl font-black text-[#111827]">Vendor Application</h2>
              <button (click)="selectedVendor.set(null)" class="text-gray-400 hover:text-gray-600">
                <svg lucideX [size]="24"></svg>
              </button>
            </div>

            <div class="space-y-8">
              <section>
                <h4 class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Profile Info</h4>
                <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div>
                    <p class="text-[10px] text-gray-400 uppercase">Legal Name</p>
                    <p class="text-sm font-bold">{{ selectedVendor().fullLegalName }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-gray-400 uppercase">Phone</p>
                    <p class="text-sm font-bold">{{ selectedVendor().phoneNumber }}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="text-[10px] text-gray-400 uppercase">Address</p>
                    <p class="text-sm font-bold">{{ selectedVendor().address }}, {{ selectedVendor().city }} {{ selectedVendor().postalCode }}</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Business Info</h4>
                <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div>
                    <p class="text-[10px] text-gray-400 uppercase">Business Name</p>
                    <p class="text-sm font-bold">{{ selectedVendor().businessName || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-gray-400 uppercase">Type</p>
                    <p class="text-sm font-bold">{{ selectedVendor().businessType || 'N/A' }}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="text-[10px] text-gray-400 uppercase">Reg Number</p>
                    <p class="text-sm font-bold">{{ selectedVendor().businessRegistrationNumber || 'N/A' }}</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Verification Documents</h4>
                <div class="space-y-2">
                  <div class="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span class="text-sm font-medium">Identity Document (Front)</span>
                    <span class="text-[10px] font-bold text-green-600 uppercase">Uploaded</span>
                  </div>
                  <div class="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span class="text-sm font-medium">Identity Document (Back)</span>
                    <span class="text-[10px] font-bold text-green-600 uppercase">Uploaded</span>
                  </div>
                  <div class="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                    <span class="text-sm font-medium">Trade License</span>
                    <span class="text-[10px] font-bold text-green-600 uppercase">Uploaded</span>
                  </div>
                </div>
              </section>

              @if (selectedVendor().onboardingStatus === 'VerificationSubmitted') {
                <div class="flex gap-3 pt-6 border-t border-gray-100">
                  <button (click)="approve(selectedVendor().id)" class="flex-1 vp-btn vp-btn--primary">Approve Application</button>
                  <button (click)="promptReject(selectedVendor().id)" class="flex-1 vp-btn vp-btn--secondary !text-red-600">Reject Application</button>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- Reject Modal -->
      @if (rejectingId()) {
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl" appFadeIn>
            <h2 class="text-xl font-black text-[#111827] mb-4">Rejection Reason</h2>
            <textarea #reasonInput class="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-red-500 outline-none" placeholder="Explain why the application is being rejected..."></textarea>
            <div class="flex gap-3 mt-6">
              <button (click)="reject(rejectingId()!, reasonInput.value)" class="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">Submit Rejection</button>
              <button (click)="rejectingId.set(null)" class="flex-1 px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  private readonly auth = inject(VendorAuthService);
  
  readonly vendors = signal<any[]>([]);
  readonly loading = signal(true);
  readonly selectedVendor = signal<any>(null);
  readonly rejectingId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.loading.set(true);
    this.auth.getVendors().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.vendors.set(res.data);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'VerificationSubmitted': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  viewVendor(vendor: any): void {
    this.selectedVendor.set(vendor);
  }

  approve(id: string): void {
    if (!confirm('Are you sure you want to approve this vendor?')) return;
    this.auth.approveVendor(id).subscribe(() => {
      this.selectedVendor.set(null);
      this.loadVendors();
    });
  }

  promptReject(id: string): void {
    this.rejectingId.set(id);
  }

  reject(id: string, reason: string): void {
    if (!reason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    this.auth.rejectVendor(id, reason).subscribe(() => {
      this.rejectingId.set(null);
      this.selectedVendor.set(null);
      this.loadVendors();
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
