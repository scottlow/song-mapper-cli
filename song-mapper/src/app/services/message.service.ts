import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MemoryLocation } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private _markerSubject = new Subject<MemoryLocation>();
  markerMessages = this._markerSubject.asObservable();

  constructor() { }

  sendMarkerMessage(memoryLocation: MemoryLocation) {
    this._markerSubject.next(memoryLocation);
  }
}
