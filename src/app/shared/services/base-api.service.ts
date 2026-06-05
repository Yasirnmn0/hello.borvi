// base-api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseApiService {
  protected apiUrl: string;
  protected httpClient: HttpClient;

  get<T>(endpoint: string, params?: {}, reqOpts: any = {}): Observable<T> {
    const formattedEndpoint = this.appendUrlParams(endpoint, params);
    
    // Create proper HttpOptions
    const options: {
      withCredentials: boolean;
      headers?: HttpHeaders;
      params?: HttpParams;
      observe?: 'body';
      [key: string]: any;
    } = {
      withCredentials: true,
      observe: 'body' as const,
      ...reqOpts
    };
    
    return this.httpClient.get<T>(this.apiUrl + formattedEndpoint, options);
  }

  post<T>(endpoint: string, body: any, reqOpts: any = {}): Observable<T> {
    const options: {
      withCredentials: boolean;
      headers?: HttpHeaders;
      params?: HttpParams;
      observe?: 'body';
      [key: string]: any;
    } = {
      withCredentials: true,
      observe: 'body' as const,
      ...reqOpts
    };
    
    return this.httpClient.post<T>(this.apiUrl + endpoint, body, options);
  }

  put<T>(endpoint: string, body: any, reqOpts: any = {}): Observable<T> {
    const options: {
      withCredentials: boolean;
      headers?: HttpHeaders;
      params?: HttpParams;
      observe?: 'body';
      [key: string]: any;
    } = {
      withCredentials: true,
      observe: 'body' as const,
      ...reqOpts
    };
    
    return this.httpClient.put<T>(this.apiUrl + endpoint, body, options);
  }

  delete<T>(endpoint: string, params?: any, reqOpts: any = {}): Observable<T> {
    const formattedEndpoint = this.appendUrlParams(endpoint, params);
    
    const options: {
      withCredentials: boolean;
      headers?: HttpHeaders;
      params?: HttpParams;
      observe?: 'body';
      [key: string]: any;
    } = {
      withCredentials: true,
      observe: 'body' as const,
      ...reqOpts
    };
    
    return this.httpClient.delete<T>(this.apiUrl + formattedEndpoint, options);
  }

  patch<T>(endpoint: string, body: any, reqOpts: any = {}): Observable<T> {
    const options: {
      withCredentials: boolean;
      headers?: HttpHeaders;
      params?: HttpParams;
      observe?: 'body';
      [key: string]: any;
    } = {
      withCredentials: true,
      observe: 'body' as const,
      ...reqOpts
    };
    
    return this.httpClient.patch<T>(this.apiUrl + endpoint, body, options);
  }

  appendUrlParams(endpoint: string, params: any): string {
    return endpoint.replace(/{(\w+)}/g, (match) => {
      return params[match.replace(/{|}/g, '')] || match;
    });
  }
}