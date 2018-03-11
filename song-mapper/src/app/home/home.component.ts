import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _isSidebarOpen: Boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.sidebar.subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);
  }

}
