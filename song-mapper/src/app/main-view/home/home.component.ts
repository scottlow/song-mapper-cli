import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Constants } from '../../app.constants';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MemoryService } from '../../services/memory.service';
import { Memory, MemoryLocation } from '../../app.models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private _isSidebarOpen: Boolean;
  private _memories: Memory[];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private sidebarService: SidebarService,
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private router: Router,
    private memoryService: MemoryService,
    private locationService: LocationService,
    private messageService: MessageService
  ) {
    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe(event => {
      if (event instanceof NavigationEnd && authService.isAuthenticated()) {
        this.spotifyService.getCurrentSong();
      }
    });
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    this.spotifyService.getCurrentSong();
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    this.spotifyService.clearRefreshTimeout();
  }

  ngOnInit() {
    
    this.messageService.markerMessages.pipe(takeUntil(this.ngUnsubscribe)).subscribe((memoryLocation: MemoryLocation) => {
      this.locationService.updateSelectedLocation(memoryLocation);
      this.sidebarService.openSidebar(Constants.SIDEBAR_VIEW_MEMORIES);
    });

    this.sidebarService.sidebar.pipe(takeUntil(this.ngUnsubscribe)).subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);

    this.memoryService.memories.pipe(takeUntil(this.ngUnsubscribe)).subscribe(memories => {
      this._memories = memories;
    });

    if(this.authService.isAuthenticated()) {
      this.spotifyService.getDeviceList();
    }

    this.memoryService.getMemories();
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
