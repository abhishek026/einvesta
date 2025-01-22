import { environment } from '../../environments/environment';
export const API_ENDPOINTS = {
    STRAGEGY: {
      DATE: `${environment.apiBaseUrl}/api/expiry-dates`,
      GET_BY_DATE: (date: string) => `${environment.apiBaseUrl}/api/expiry-data?expiry=${date}`,
    }
  };
  