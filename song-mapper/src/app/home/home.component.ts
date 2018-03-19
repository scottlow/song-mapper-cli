import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { SidebarService } from '../sidebar.service';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _isSidebarOpen: Boolean;

  constructor(
    private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.sidebar.subscribe(isSidebarOpen => this._isSidebarOpen = isSidebarOpen);
  }

  get newMemoryState() {
    return Constants.SIDEBAR_NEW_MEMORY;
  }

  get viewMemoriesState() {
    return Constants.SIDEBAR_VIEW_MEMORIES;
  }

}
