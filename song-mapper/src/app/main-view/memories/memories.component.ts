import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth/auth.service';
import { Memory } from '../../app.models';
import { MemoryService } from '../../services/memory.service';
import { Constants } from '../../app.constants';
import { LocationService } from '../../services/location.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatBottomSheet } from '@angular/material';
import { ViewMemoriesComponent } from '../../sidebar/view-memories/view-memories.component';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css']
})
export class MemoriesComponent implements OnInit, OnDestroy {
  private _isSidebarOpen: Boolean;
  private _memories: Memory[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private sidebarService: SidebarService,
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private memoryService: MemoryService,
    private locationService: LocationService,
    private deviceService: DeviceDetectorService,
    private bottomSheet: MatBottomSheet,
    private messageService: MessageService
  ) { }

  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    this.spotifyService.getCurrentSong();
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    this.spotifyService.clearRefreshTimeout();
  }

  ngOnInit() {
    
    if(this.deviceService.isMobile()) {
      this.messageService.markerMessages.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
        this.bottomSheet.open(ViewMemoriesComponent);
      });
    }

    this.sidebarService.sidebar.pipe(takeUntil(this.ngUnsubscribe)).subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);

    this.memoryService.memories.pipe(takeUntil(this.ngUnsubscribe)).subscribe(memories => {
      this._memories = memories;
    });

    if (this.authService.isAuthenticated()) {
      this.spotifyService.getCurrentSong();
      this.spotifyService.getDeviceList();
      this.memoryService.getCurrentUsersMemories();
    }

    this.locationService.clearCurrentlySelectedLocation();
  }

  get newMemoryState() {
    return Constants.SIDEBAR_NEW_MEMORY;
  }

  get viewMemoriesState() {
    return Constants.SIDEBAR_VIEW_MEMORIES;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
