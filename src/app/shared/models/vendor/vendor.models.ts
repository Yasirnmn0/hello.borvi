export type VendorOnboardingStatus =
  | 'AccountCreated'
  | 'ProfileCompleted'
  | 'BusinessInfoSubmitted'
  | 'VerificationSubmitted'
  | 'Approved'
  | 'Rejected';

export type AuthProvider = 'email' | 'google';

export interface VendorUser {
  id: string;
  email: string;
  password?: string;
  displayName: string;
  provider: AuthProvider;
  avatarUrl?: string;
  createdAt: string;
}

export interface VendorSession {
  userId: string;
  email: string;
  displayName: string;
  token: string;
  provider: AuthProvider;
}

export interface VendorProfile {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  bio: string;
  avatarUrl?: string;
  updatedAt: string;
}

export interface VendorBusiness {
  userId: string;
  businessName: string;
  legalForm: string;
  taxId: string;
  vatId: string;
  businessEmail: string;
  businessPhone: string;
  website: string;
  categoryIds: string[];
  description: string;
  pickupAddress: string;
  deliveryAvailable: boolean;
  updatedAt: string;
}

export interface VendorDocument {
  typeId: string;
  fileName: string;
  fileSize?: number;
  uploadedAt: string;
}

export interface VendorProduct {
  id: string;
  userId: string;
  title: string;
  categoryId: string;
  description: string;
  condition: string;
  dailyPrice: number;
  weeklyPrice?: number;
  deposit: number;
  quantity: number;
  imageNames: string[];
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface VendorCategory {
  id: string;
  label: string;
  icon: string;
}

export interface VendorDocumentType {
  id: string;
  label: string;
  required: boolean;
}

export interface OnboardingStep {
  id: string;
  labelKey: string;
  route: string;
  statusKey: VendorOnboardingStatus;
  minStatus: VendorOnboardingStatus;
}
