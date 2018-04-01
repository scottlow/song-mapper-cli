import { Injectable } from '@angular/core';
import {PinLocation, MemoryLocation} from './models';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StorageService } from './storage.service';

@Injectable()
export class LocationService {
  private _newMemoryPinLocation = new ReplaySubject<PinLocation>();
  private _currentlySelectedLocation = new ReplaySubject<MemoryLocation>();

  newMemoryPinLocation = this._newMemoryPinLocation.asObservable();
  selectedLocation = this._currentlySelectedLocation.asObservable();

  constructor(private storage: StorageService) { }

  updateNewMemoryPinLocation(location: PinLocation) {
    this._newMemoryPinLocation.next(location);
  }

  dropPin(location: PinLocation) {
    location.showPin = true;
    this.updateNewMemoryPinLocation(location);
  }

  updateSelectedLocation(memoryLocation: MemoryLocation) {
    this._currentlySelectedLocation.next(memoryLocation);
  }

  getInitialLocation(): void {
    if (navigator.geolocation) {

      // Get current position from storage (if available)
      let currentLat = Number(this.storage.get('currentLat'));
      let currentLong = Number(this.storage.get('currentLong'));

      if (currentLat && currentLong) {
        this.updateNewMemoryPinLocation(new PinLocation(currentLat, currentLong));
      }

      // Update current position
      navigator.geolocation.getCurrentPosition(position => {
        let currentPosition = position.coords;

        this.updateNewMemoryPinLocation(new PinLocation(currentPosition.latitude, currentPosition.longitude));

        this.storage.set('currentLat', currentPosition.latitude.toString());
        this.storage.set('currentLong', currentPosition.longitude.toString());
      });
    };
  }
}
