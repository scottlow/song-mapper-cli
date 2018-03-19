import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { MemoryLocation } from '../models';
import { SidebarService } from '../sidebar.service';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-view-memories',
  templateUrl: './view-memories.component.html',
  styleUrls: ['./view-memories.component.css']
})
export class ViewMemoriesComponent implements OnInit {
  private _selectedLocation: MemoryLocation;

  constructor(
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.locationService.selectedLocation.subscribe(location => {
      this._selectedLocation = location;
    });
  }

}
