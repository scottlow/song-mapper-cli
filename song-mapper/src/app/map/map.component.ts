import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from '../location.service';
import { Memory } from '../models';
import { MemoryService } from '../memory.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  newMemoryLat: Number;
  newMemoryLong: Number;
  showNewMemoryPin: Boolean;
  zoom = 14;

  private _memories;

  constructor(
    private storage: StorageService,
    private locationService: LocationService,
    private memoryService: MemoryService
  ) { }

  ngOnInit() {
    this.locationService.mapLocation.subscribe(location => {
      this.newMemoryLat = location.lat;
      this.newMemoryLong = location.long;
      this.showNewMemoryPin = location.showPin;
    });

    this._memories = this.memoryService.getMemories();

    this.locationService.getInitialLocation();
  }

}
