import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs/Subscription';
import { LocationService } from '../location.service';
import { MemoryLocation, Memory } from '../models';
import { MemoryService } from '../memory.service';
import { SidebarService } from '../sidebar.service';
import { Constants } from '../app.constants';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input('memories') _memories: Memory[];
  @Input() markerClickable: Boolean = true;
  newMemoryLat: Number;
  newMemoryLong: Number;
  showNewMemoryPin: Boolean;
  zoom = 14;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private storage: StorageService,
    private locationService: LocationService,
    private memoryService: MemoryService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.sidebar.takeUntil(this.ngUnsubscribe).subscribe(isSidebarOpen => {
      if (!isSidebarOpen) this.hidePin();
    });

    this.locationService.newMemoryPinLocation.takeUntil(this.ngUnsubscribe).subscribe(location => {
      if (location == null) {
        this.hidePin();
        return;
      }
      this.newMemoryLat = location.lat;
      this.newMemoryLong = location.long;
      this.showNewMemoryPin = location.showPin;
    });

    // Initialize services
    this.locationService.getInitialLocation();
  }

  hidePin(): void {
    this.showNewMemoryPin = false;
  }

  updateSelectedLocation(memoryLocation: MemoryLocation): void {
    this.sidebarService.openSidebar(Constants.SIDEBAR_VIEW_MEMORIES);
    this.locationService.updateSelectedLocation(memoryLocation);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
