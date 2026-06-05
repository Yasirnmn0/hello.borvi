export type VendorAuthProvider = 'email' | 'google';

export type VendorOnboardingStatus =
  | 'registered'
  | 'profile_complete'
  | 'business_complete'
  | 'verification_complete'
  | 'pending_approval'
  | 'approved'
  | 'rejected';

export interface VendorProfile {
  firstName: string;
  lastName: string;
  phone: string;
  jobTitle: string;
  bio: string;
  avatarUrl?: string;
}

export interface VendorBusiness {
  businessName: string;
  businessType: string;
  vatId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  website?: string;
  description: string;
}

export interface VendorVerification {
  idDocumentName: string;
  businessDocumentName: string;
  bankAccountHolder: string;
  iban: string;
  agreedToTerms: boolean;
  submittedAt?: string;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  title: string;
  category: string;
  description: string;
  condition: string;
  dailyPrice: number;
  deposit: number;
  quantity: number;
  imageUrl?: string;
  status: 'draft' | 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface VendorUser {
  id: string;
  email: string;
  password?: string;
  displayName: string;
  authProvider: VendorAuthProvider;
  createdAt: string;
  onboardingStatus: VendorOnboardingStatus;
  rejectionReason?: string;
  profile?: VendorProfile;
  business?: VendorBusiness;
  verification?: VendorVerification;
}

export interface VendorSession {
  userId: string;
  token: string;
  expiresAt: string;
}

export interface VendorCatalogCategory {
  id: string;
  name: string;
  icon: string;
}

export interface VendorMockDatabase {
  users: VendorUser[];
  products: VendorProduct[];
  categories: VendorCatalogCategory[];
}

export interface VendorSignupPayload {
  email: string;
  password: string;
  displayName: string;
  acceptTerms: boolean;
}

export interface VendorGoogleSignupPayload {
  email: string;
  displayName: string;
}
