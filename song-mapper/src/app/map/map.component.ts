import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from '../location.service';
import { MemoryLocation } from '../models';
import { MemoryService } from '../memory.service';
import { SidebarService } from '../sidebar.service';
import { Constants } from '../app.constants';

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
    private memoryService: MemoryService,
    private sidebarService: SidebarService
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

  updateSelectedLocation(memoryLocation: MemoryLocation) {
    this.sidebarService.openSidebar(Constants.SIDEBAR_VIEW_MEMORIES);
    this.locationService.updateSelectedLocation(memoryLocation);
  }

}
