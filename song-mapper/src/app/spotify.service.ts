import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Constants } from "./app.constants";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

@Injectable()
export class SpotifyService {

  constructor(
    private http: HttpClient
  ) { }

  getSpotifySearchResults(query: string): Observable<any> {
    return this.http
      .get(Constants.API_URL + '/spotify/search', { params: new HttpParams().set('q', query) })
  }

}