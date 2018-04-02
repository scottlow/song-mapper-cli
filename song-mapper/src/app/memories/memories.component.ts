import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { SpotifyService } from '../spotify.service';
import { AuthService } from '../auth.service';
import { Memory } from '../models';
import { MemoryService } from '../memory.service';
import { Constants } from '../app.constants';
import { LocationService } from '../location.service';
import { Subject } from 'rxjs/Subject';

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
    this.sidebarService.sidebar.takeUntil(this.ngUnsubscribe).subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);

    this.memoryService.memories.takeUntil(this.ngUnsubscribe).subscribe(memories => {
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
