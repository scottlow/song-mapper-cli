import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './app.constants';
import { MemoryLocation, Song, Memory } from './models';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MemoryService {
  private _memories = new Subject<Memory[]>();
  memories = this._memories.asObservable();
  private dataStore: {
    memories: Memory[]
  };

  constructor(
    private http: HttpClient
  ) {
    this.dataStore = { memories: [] };
  }

  getMemories(): void {
    this.http.get<Memory[]>(Constants.API_URL + '/memories').subscribe(memories => {
      this.dataStore.memories = memories;
      this._memories.next(Object.assign({}, this.dataStore).memories);
    });
  }

  createMemory(location: MemoryLocation, song: Song): Observable<any> {
    let newMemory = new Memory(song, location);
    this.dataStore.memories = this.dataStore.memories.concat(newMemory);
    this._memories.next(Object.assign({}, this.dataStore).memories);

    return this.http
      .post(Constants.API_URL + '/memories/create', {
        data: {
          location: location,
          song: song
        }
      });
  }
}
