import { Component, OnInit } from '@angular/core';
import { Constants } from '../app.constants';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = Constants.APP_TITLE;

  constructor(
    private authService: AuthService
  ) {}

  login(): void {
    this.authService.startSpotifyAuth();
  }

  logout(): void {
    this.authService.logout();
  }
  
}
