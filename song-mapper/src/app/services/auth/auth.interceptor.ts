import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, catchError, filter, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public authService: AuthService) { }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    // If we're already refreshing a token, don't request another
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      // Request a new token
      return this.authService.getRefreshToken().pipe(
        switchMap((response: any) => {
          let newToken = response.token;
          if (newToken) {
            this.tokenSubject.next(newToken);
            this.authService.setUserToken(newToken);
            this.isRefreshingToken = false;
            return next.handle(this.addToken(req));
          } else {
            return this.authService.logout();
          }
        }));
    } else {
      // Return the tokenSubject so that every pending request gets a token once the getRefreshToken call completes
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(newToken => {
          this.authService.setUserToken(newToken);
          return next.handle(this.addToken(req));
        }));
    }
  }

  private addToken(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'x-access-token': this.authService.getUserToken()
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuthenticated()) {
      request = this.addToken(request);
    }
    return next.handle(request).pipe(catchError((error: any, result: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return Observable.throw(error);
      }
    }));
  }
}