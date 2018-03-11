import { Injectable } from '@angular/core';
import {MapLocation} from './models';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StorageService } from './storage.service';

@Injectable()
export class LocationService {
  private _mapLocation = new ReplaySubject<MapLocation>();
  mapLocation = this._mapLocation.asObservable();

  constructor(private storage: StorageService) { }

  updateMapLocation(location: MapLocation) {
    this._mapLocation.next(location);
  }

  dropPin(location: MapLocation) {
    location.showPin = true;
    this.updateMapLocation(location);
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
