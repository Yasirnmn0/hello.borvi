import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseApiService {
  override apiUrl = `${environment.apiUrl}/`;

  constructor(protected override httpClient: HttpClient) {
    super();
  }

  // api.service.ts
getWithQueryParams<T>(endpoint: string, queryParams?: {}, reqOpts?: any) {
  const formattedEndpoint = this.appendQueryParametersInUrl(
    endpoint,
    queryParams
  );
  
  // Use the base get method which now has withCredentials: true
  return this.get<T>(formattedEndpoint, reqOpts);
}

postWithQueryParams<T>(
  endpoint: string,
  body: any,
  queryParams?: {},
  reqOpts?: any
) {
  const formattedEndpoint = this.appendQueryParametersInUrl(
    endpoint,
    queryParams
  );
  
  // Use the base post method which now has withCredentials: true
  return this.post<T>(formattedEndpoint, body, reqOpts);
}
  appendQueryParametersInUrl(endpoint: string, params: any): string {
    let i = 0;
    for (let param in params) {
      if (params[param]) {
        endpoint += `${i++ == 0 ? '?' : '&'}${param}=${params[param]}`;
      }
    }
    return endpoint;
  }
}
