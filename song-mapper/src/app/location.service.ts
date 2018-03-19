import { Injectable } from '@angular/core';
import {MapLocation, MemoryLocation} from './models';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StorageService } from './storage.service';

@Injectable()
export class LocationService {
  private _mapLocation = new ReplaySubject<MapLocation>();
  private _currentlySelectedLocation = new ReplaySubject<MemoryLocation>();

  mapLocation = this._mapLocation.asObservable();
  selectedLocation = this._currentlySelectedLocation.asObservable();

  constructor(private storage: StorageService) { }

  updateMapLocation(location: MapLocation) {
    this._mapLocation.next(location);
  }

  dropPin(location: MapLocation) {
    location.showPin = true;
    this.updateMapLocation(location);
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
        this.updateMapLocation(new MapLocation(currentLat, currentLong));
      }

      // Update current position
      navigator.geolocation.getCurrentPosition(position => {
        let currentPosition = position.coords;

        this.updateMapLocation(new MapLocation(currentPosition.latitude, currentPosition.longitude));

        this.storage.set('currentLat', currentPosition.latitude.toString());
        this.storage.set('currentLong', currentPosition.longitude.toString());
      });
    };
  }
}
