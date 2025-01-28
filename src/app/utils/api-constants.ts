import { environment } from '../../environments/environment';
export const API_ENDPOINTS = {
    STRAGEGY: {
      DATE: `${environment.apiBaseUrl}/api/expiry-dates`,
      GET_BY_DATE: (date: string) => `${environment.apiBaseUrl}/api/expiry-data?expiry=${date}`,
      SAVE_ORDER_TEMPLATE:`${environment.apiBaseUrl}/api/save-order-template`,
    },
    TEMPLATE: {
      GET_ALL: `${environment.apiBaseUrl}/api/getAllTemplates`,
      DELETE:(teplateName:string)=> `${environment.apiBaseUrl}/api/deleteByTemplateName?templateName=${teplateName}`,

    }
  };
  