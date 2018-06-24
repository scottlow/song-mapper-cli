import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth/auth.service';
import { Memory } from '../../app.models';
import { MemoryService } from '../../services/memory.service';
import { Constants } from '../../app.constants';
import { LocationService } from '../../services/location.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.sidebarService.sidebar.pipe(takeUntil(this.ngUnsubscribe)).subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);

    this.memoryService.memories.pipe(takeUntil(this.ngUnsubscribe)).subscribe(memories => {
      this._memories = memories;
    });

    if (this.authService.isAuthenticated()) {
      this.spotifyService.getCurrentSong();
    }

    this.memoryService.getCurrentUsersMemories();
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
