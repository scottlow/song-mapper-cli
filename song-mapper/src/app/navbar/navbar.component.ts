import { Component, OnInit } from '@angular/core';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = Constants.APP_TITLE;

  constructor() {}

  ngOnInit() {
  }

}
