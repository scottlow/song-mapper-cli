import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { SidebarService } from '../sidebar.service';
import { Constants, PlaybackState } from '../app.constants';
import { SpotifyService } from '../spotify.service';
import { PlayerComponent } from '../player/player.component';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _isSidebarOpen: Boolean;

  constructor(
    private sidebarService: SidebarService,
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && authService.isAuthenticated()) {
        this.spotifyService.getCurrentSong();
      }
    });
  }

  ngOnInit() {
    this.sidebarService.sidebar.subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);

    if (this.authService.isAuthenticated()) {
      this.spotifyService.getCurrentSong();
    }
  }

  get newMemoryState() {
    return Constants.SIDEBAR_NEW_MEMORY;
  }

  get viewMemoriesState() {
    return Constants.SIDEBAR_VIEW_MEMORIES;
  }

}
