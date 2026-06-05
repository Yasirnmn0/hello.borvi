import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { VendorStorageConstant } from '../../shared/constants/vendor-storage.constant';

export const vendorAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(VendorStorageConstant.Token);
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
