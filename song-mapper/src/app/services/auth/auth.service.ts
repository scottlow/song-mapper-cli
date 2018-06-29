import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Constants } from "../../app.constants";
import { User } from "../../app.models";
import { StorageService } from '../storage.service';
import { empty } from 'rxjs/observable/empty';

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

  getRefreshToken() {
    return this.http.post(Constants.API_URL + '/refresh-token', { user_id: this.getCurrentUser()._id });
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

  setUserToken(token: string): void {
    let user = this.getCurrentUser();
    user.token = token;
    this.saveCurrentUser(user);
  }

  getCurrentUser(): User {
    return JSON.parse(this.storage.get('currentUser'));
  }

  isAuthenticated(): boolean {
    var user = this.storage.get('currentUser');
    return user ? true : false;
  }

  logout() {
    this.storage.remove('currentUser');
    return empty();
  }
}
