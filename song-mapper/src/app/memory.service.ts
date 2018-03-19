import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './app.constants';
import { MemoryLocation, Song } from './models';

@Injectable()
export class MemoryService {

  constructor(
    private http: HttpClient
  ) { }

  createMemory(location: MemoryLocation, song: Song): Observable<any> {
    return this.http
      .post(Constants.API_URL + '/memories/create', {
        data: {
          location: location,
          song: song
        }
      });
  }
}
