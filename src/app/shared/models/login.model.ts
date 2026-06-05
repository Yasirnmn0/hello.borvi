// ==============================
// Footzy Login Models
// ==============================

// Handles local UI states (spinner, errors, etc.)
export class logincomps {
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
}

// ==============================
// API Response Model
// ==============================
export interface LoginResponseModel {
  success: boolean;
  message: string;
  totalCount: number;
  data: LoginDataModel;
}

// ==============================
// Login Data (inside "data")
// ==============================
export interface LoginDataModel {
  token: string;
  expiresIn: number;
  userId: number;
  companyId: number;
  roleId: number;
  roleName: string;
  rights: string[];
  allowedShopIds: number[];
  refreshToken: string;
  companyCollectionId: string;
}

// ==============================
// User Info (optional helper)
// ==============================
export interface UserInfoModel {
  userId: number;
  userEmail?: string;
  userName?: string;
  companyId?: number;
  roleId?: number;
  roleName?: string;
  rights?: string[];
  allowedShopIds?: number[];
}
