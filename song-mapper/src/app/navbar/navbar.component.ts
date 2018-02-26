import { Component, OnInit } from '@angular/core';
import { Constants } from '../app.constants';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = Constants.APP_TITLE;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  login(): void {
    this.authService.startSpotifyAuth();
  }
}
