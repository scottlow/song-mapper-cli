import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: Number;
  long: Number;
  showPin: Boolean;
  zoom = 14;

  constructor(
    private storage: StorageService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.mapLocation.subscribe(location => {
      this.lat = location.lat;
      this.long = location.long;
      this.showPin = location.showPin;
    });

    this.locationService.getInitialLocation();
  }

}
