import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { SidebarService } from '../sidebar.service';
import { Constants, PlaybackState } from '../app.constants';
import { SpotifyService } from '../spotify.service';
import { PlayerComponent } from '../player/player.component';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MemoryService } from '../memory.service';
import { Memory } from '../models';
import { Subject } from 'rxjs/Subject';

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
    private memoryService: MemoryService
  ) {
    this.router.events.takeUntil(this.ngUnsubscribe).subscribe(event => {
      if (event instanceof NavigationEnd && authService.isAuthenticated()) {
        this.spotifyService.getCurrentSong();
      }
    });
  }

  ngOnInit() {
    this.sidebarService.sidebar.takeUntil(this.ngUnsubscribe).subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);

    this.memoryService.memories.takeUntil(this.ngUnsubscribe).subscribe(memories => {
      this._memories = memories;
    });

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
