import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = environment.apiUrl; // Get the API URL from environment.ts

  constructor(private http: HttpClient) {}

  /**
   * Generate headers with optional authorization token.
   * @param token - Bearer token for authentication (optional).
   */
  private createHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // If a token is provided, append it to the headers for authorization
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Perform a GET request.
   * @param endpoint - API endpoint.
   * @param params - Optional URL parameters.
   */
  get<T>(endpoint: string, params?: HttpParams, token?: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.createHeaders(token);

    return this.http.get<T>(url, { headers, params }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a POST request.
   * @param endpoint - API endpoint.
   * @param body - Request payload.
   * @param token - Optional Bearer token.
   */
  post<T>(endpoint: string, body: any, token?: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.createHeaders(token);

    return this.http.post<T>(url, body, { headers }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a PUT request.
   * @param endpoint - API endpoint.
   * @param body - Request payload.
   * @param token - Optional Bearer token.
   */
  put<T>(endpoint: string, body: any, token?: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.createHeaders(token);

    return this.http.put<T>(url, body, { headers }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a DELETE request.
   * @param endpoint - API endpoint.
   * @param token - Optional Bearer token.
   */
  delete<T>(endpoint: string, token?: string): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.createHeaders(token);

    return this.http.delete<T>(url, { headers }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error - The error response.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server error: ${error.status}, Message: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
