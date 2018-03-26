import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { MemoryLocation, Song } from '../models';
import { SidebarService } from '../sidebar.service';
import { Constants } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { SongService } from '../song.service';

@Component({
  selector: 'app-view-memories',
  templateUrl: './view-memories.component.html',
  styleUrls: ['./view-memories.component.css']
})
export class ViewMemoriesComponent implements OnInit {
  private _selectedLocation: MemoryLocation;
  private _memoriesAtLocation;

  constructor(
    private locationService: LocationService,
    private http: HttpClient,
    private authService: AuthService,
    private songService: SongService
  ) { }

  ngOnInit() {
    this.locationService.selectedLocation.subscribe(location => {
      this._selectedLocation = location;

      this.http.get(Constants.API_URL + '/memories/location/' + this._selectedLocation.gId).subscribe(response => {
        this._memoriesAtLocation = response;
      });
    });
  }

  playSong(song: Song): void {
    this.songService.playSong(song);
  }

}
