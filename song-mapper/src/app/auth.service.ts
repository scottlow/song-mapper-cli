import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from "./app.constants";
import { SpotifyAuthToken } from "./spotify.models";

@Injectable()
export class AuthService {

  authToken: SpotifyAuthToken;

  constructor(
    private http: HttpClient,
  ) { }

  startSpotifyAuth(): void {
    var params = new HttpParams()
      .set('client_id', Constants.SPOTIFY_CLIENT_ID)
      .set('response_type', 'code')
      .set('redirect_uri', Constants.SPOTIFY_REDIRECT_URI)
      .set('scopes', 'user-read-private user-read-email');

    let spotifyAuthURL = new HttpRequest("GET", Constants.SPOTIFY_AUTH_URL, {params: params});
    window.location.href = spotifyAuthURL.urlWithParams;
  }
}
