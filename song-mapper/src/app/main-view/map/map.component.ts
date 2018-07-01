import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LocationService } from '../../services/location.service';
import { MemoryLocation, Memory } from '../../app.models';
import { MemoryService } from '../../services/memory.service';
import { SidebarService } from '../../services/sidebar.service';
import { Constants } from '../../app.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';

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
    private locationService: LocationService,
    private sidebarService: SidebarService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.sidebarService.sidebar.pipe(takeUntil(this.ngUnsubscribe)).subscribe(isSidebarOpen => {
      if (!isSidebarOpen) this.hidePin();
    });

    this.locationService.newMemoryPinLocation.pipe(takeUntil(this.ngUnsubscribe)).subscribe(location => {
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

  handleMarkerClick(memoryLocation: MemoryLocation): void {
    this.messageService.sendMarkerMessage(memoryLocation);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
