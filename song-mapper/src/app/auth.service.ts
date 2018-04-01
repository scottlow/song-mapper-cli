import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from "./app.constants";
import { User } from "./models";
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  doLogin(authCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<User>(Constants.API_URL + '/login',
        { code: authCode }
      ).subscribe(user => {
        this.saveCurrentUser(user);
        resolve();
      });
    });
  }

  startSpotifyAuth(): void {
    var params = new HttpParams()
      .set('client_id', Constants.SPOTIFY_CLIENT_ID)
      .set('response_type', 'code')
      .set('redirect_uri', Constants.SPOTIFY_REDIRECT_URI)
      .set('scope', 'user-read-email, user-modify-playback-state, user-read-playback-state');

    let spotifyAuthURL = new HttpRequest("GET", Constants.SPOTIFY_AUTH_URL, { params: params });
    window.location.href = spotifyAuthURL.urlWithParams;
  }

  private saveCurrentUser(user: User): void {
    this.storage.set('currentUser', JSON.stringify(user));
  }

  getUserToken(): string {
    let user = this.getCurrentUser();
    return user.token;
  }

  getCurrentUser(): User {
    return JSON.parse(this.storage.get('currentUser'));
  }

  isAuthenticated(): boolean {
    var user = this.storage.get('currentUser');
    return user ? true : false;
  }

  logout(): void {
    this.storage.remove('currentUser');
  }
}
