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
    this.sidebarService.sidebar.subscribe(isSidebarOpen => {
      if(!isSidebarOpen) this.hidePin();
    });

    this.locationService.newMemoryPinLocation.subscribe(location => {
      if (location == null) {
        this.hidePin();
        return;
      }
      this.newMemoryLat = location.lat;
      this.newMemoryLong = location.long;
      this.showNewMemoryPin = location.showPin;
    });

    this.memoryService.memories.subscribe(memories => {
      this._memories = memories;
    });

    // Initialize services
    this.locationService.getInitialLocation();
    this.memoryService.getMemories();
  }

  hidePin(): void {
    this.showNewMemoryPin = false;
  }

  updateSelectedLocation(memoryLocation: MemoryLocation): void {
    this.sidebarService.openSidebar(Constants.SIDEBAR_VIEW_MEMORIES);
    this.locationService.updateSelectedLocation(memoryLocation);
  }

}
