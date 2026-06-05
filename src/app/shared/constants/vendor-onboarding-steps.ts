import { OnboardingStep, VendorOnboardingStatus } from '../models/vendor/vendor.models';

export const VENDOR_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'profile',
    labelKey: 'vendor.onboarding.profile',
    route: '/vendor/profile',
    statusKey: 'ProfileCompleted',
    minStatus: 'AccountCreated',
  },
  {
    id: 'business',
    labelKey: 'vendor.onboarding.business',
    route: '/vendor/business',
    statusKey: 'BusinessInfoSubmitted',
    minStatus: 'ProfileCompleted',
  },
  {
    id: 'verification',
    labelKey: 'vendor.onboarding.verification',
    route: '/vendor/verification',
    statusKey: 'VerificationSubmitted',
    minStatus: 'BusinessInfoSubmitted',
  },
  {
    id: 'approval',
    labelKey: 'vendor.onboarding.approval',
    route: '/vendor/approval',
    statusKey: 'Approved',
    minStatus: 'VerificationSubmitted',
  },
];

export const ONBOARDING_STATUS_ORDER: VendorOnboardingStatus[] = [
  'AccountCreated',
  'ProfileCompleted',
  'BusinessInfoSubmitted',
  'VerificationSubmitted',
  'Approved',
  'Rejected',
];

export function onboardingIndex(status: VendorOnboardingStatus): number {
  return ONBOARDING_STATUS_ORDER.indexOf(status);
}

export function isAtLeast(
  current: VendorOnboardingStatus,
  required: VendorOnboardingStatus
): boolean {
  return onboardingIndex(current) >= onboardingIndex(required);
}
