import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  private apiKey = 'sk.179555b.3d453a1040679cedadfe4c6ef';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    return next.handle(request);
  }

  constructor() {}
}

// const isApiRequest = request.url.startsWith('API_HOST_URL');

// if (isApiRequest) {
//   request = request.clone({
//     setParams: { api_key: 'sk.179555b.3d453a1040679cedadfe4c6ef' },
//   });
// }
