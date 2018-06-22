import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../app.constants';
import { MemoryLocation, Song, Memory } from '../app.models';
import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth/auth.service';

@Injectable()
export class MemoryService {
  private _memories = new Subject<Memory[]>();
  memories = this._memories.asObservable();
  private dataStore: {
    memories: Memory[]
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.dataStore = { memories: [] };
  }

  getCurrentUsersMemories(): void {
    this.http.get<Memory[]>(Constants.API_URL + '/me/memories').subscribe(memories => {
      this.dataStore.memories = memories;
      this._memories.next(Object.assign({}, this.dataStore).memories);
    });
  }

  getMemories(): void {
    this.http.get<Memory[]>(Constants.API_URL + '/memories').subscribe(memories => {
      this.dataStore.memories = memories;
      this._memories.next(Object.assign({}, this.dataStore).memories);
    });
  }

  deleteMemory(memoryId: any) {
    this.dataStore.memories.forEach((memory, index) => {
      if (memory._id === memoryId) {
        this.dataStore.memories.splice(index, 1);
        this.http.delete(Constants.API_URL + '/me/memories/delete', { params: { memoryId: memoryId } }).subscribe();
      }
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
