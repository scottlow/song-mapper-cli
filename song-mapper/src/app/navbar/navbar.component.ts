import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../app.constants';

import { AuthService } from '../auth.service';
import { MatSidenav } from '@angular/material';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = Constants.APP_TITLE;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  login(): void {
    this.authService.startSpotifyAuth();
  }

  logout(): void {
    this.authService.logout();
  }

  openSidebar(): void {
    this.sidebarService.openSidebar();
  }
}
