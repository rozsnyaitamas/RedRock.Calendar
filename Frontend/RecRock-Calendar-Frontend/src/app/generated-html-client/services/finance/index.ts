/* tslint:disable */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { FinanceAPIClient, USE_DOMAIN, USE_HTTP_OPTIONS } from './finance-api-client.service';
import { GuardedFinanceAPIClient } from './guarded-finance-api-client.service';

export { FinanceAPIClient } from './finance-api-client.service';
export { FinanceAPIClientInterface } from './finance-api-client.interface';
export { GuardedFinanceAPIClient } from './guarded-finance-api-client.service';

/**
 * provided options, headers and params will be used as default for each request
 */
export interface DefaultHttpOptions {
  headers?: {[key: string]: string};
  params?: {[key: string]: string};
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface FinanceAPIClientModuleConfig {
  domain?: string;
  guardResponses?: boolean; // validate responses with type guards
  httpOptions?: DefaultHttpOptions;
}

@NgModule({})
export class FinanceAPIClientModule {
  /**
   * Use this method in your root module to provide the FinanceAPIClientModule
   *
   * If you are not providing
   * @param { FinanceAPIClientModuleConfig } config
   * @returns { ModuleWithProviders }
   */
  static forRoot(config: FinanceAPIClientModuleConfig = {}): ModuleWithProviders<FinanceAPIClientModule> {
    return {
      ngModule: FinanceAPIClientModule,
      providers: [
        ...(config.domain != null ? [{provide: USE_DOMAIN, useValue: config.domain}] : []),
        ...(config.httpOptions ? [{provide: USE_HTTP_OPTIONS, useValue: config.httpOptions}] : []),
        ...(config.guardResponses ? [{provide: FinanceAPIClient, useClass: GuardedFinanceAPIClient }] : [FinanceAPIClient]),
      ]
    };
  }
}
