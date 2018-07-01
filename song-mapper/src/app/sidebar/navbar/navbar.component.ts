import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../app.constants';

import { AuthService } from '../../services/auth/auth.service';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private title = Constants.APP_TITLE;
  private shortTitle = Constants.SHORT_APP_TITLE;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {}

  login(): void {
    this.authService.startSpotifyAuth();
  }

  logout(): void {
    this.authService.logout();
    this.showHome();
  }

  showMemories(): void {
    this.router.navigate(['memories']);
  }

  showHome(): void {
    this.router.navigate(['home']);
  }

  createNewMemory(): void {
    this.sidebarService.openSidebar(Constants.SIDEBAR_NEW_MEMORY);
  }
}
