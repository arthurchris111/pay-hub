import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class httpInterceptor implements HttpInterceptor {
  // private apiKey = 'sk.179555b.3d453a1040679cedadfe4c6ef';
  private apiKey = 'sk.8db7e70.2bb8ca57be096f08656265bde';
  private apiUrl = 'https://staging-api.flowertop.xyz/api/v1/virtualcards/create';

  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.apiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
    }

    return next.handle(request);
  }
}
