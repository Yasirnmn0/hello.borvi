// auth.interceptor.ts - FIXED VERSION
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, BehaviorSubject } from 'rxjs';
import { LocalStorageConstant } from '../../shared/constants/local-storage.constant';
import { AuthService } from '../../core/services/auth.service';
import { ApiUrls } from '../../shared/enums/api-urls';

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = localStorage.getItem(LocalStorageConstant.Token);

  let authReq = req;
  
  if (!req.url.includes(ApiUrls.USER_LOGIN) && !req.url.includes(ApiUrls.LOGOUT)) {
    authReq = req.clone({
      withCredentials: true, 
      ...(token && !req.url.includes(ApiUrls.REFRESH_TOKEN) && {
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (req.url.includes(ApiUrls.LOGOUT)) {
        return throwError(() => error);
      }

      // Handle 401 Unauthorized errors
      if (error.status === 401 && token) {
        if (req.url.includes(ApiUrls.LOGOUT)) {
          authService.logout();
          return throwError(() => error);
        }

        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap((refreshResponse: any) => {
              isRefreshing = false;

              if (refreshResponse.success && refreshResponse.data?.token) {
                // Store new access token
                localStorage.setItem(LocalStorageConstant.Token, refreshResponse.data.token);
                refreshTokenSubject.next(refreshResponse.data.token);

                const newAuthReq = req.clone({
                  withCredentials: true, 
                  setHeaders: {
                    Authorization: `Bearer ${refreshResponse.data.token}`
                  },
                });
                return next(newAuthReq);
              } else {
                authService.logout();
                return throwError(() => new Error('Token refresh failed'));
              }
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            switchMap(newToken => {
              if (newToken) {
                const newAuthReq = req.clone({
                  withCredentials: true, 
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });
                return next(newAuthReq);
              } else {
                authService.logout();
                return throwError(() => error);
              }
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};