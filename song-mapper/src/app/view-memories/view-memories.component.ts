import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { MemoryLocation, Song } from '../models';
import { SidebarService } from '../sidebar.service';
import { Constants, PlaybackState } from '../app.constants';
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
  private _currentlyPlayingSong: Song;
  private _playbackState;

  constructor(
    private locationService: LocationService,
    private http: HttpClient,
    private authService: AuthService,
    private songService: SongService
  ) { 
    this._playbackState = PlaybackState.Stopped;
  }

  ngOnInit() {
    this.locationService.selectedLocation.subscribe(location => {
      this._selectedLocation = location;

      this.http.get(Constants.API_URL + '/memories/location/' + this._selectedLocation.gId).subscribe(response => {
        this._memoriesAtLocation = response;
      });
    });

    this.songService.currentlyPlayingSong.subscribe(currentlyPlayingSong => {
      this._currentlyPlayingSong = currentlyPlayingSong;
    });

    this.songService.playbackState.subscribe(playbackState => {
      this._playbackState = playbackState;
    });
  }

  shouldShowPauseButton(song: Song): Boolean {
    return this._currentlyPlayingSong && song.spotifyURI == this._currentlyPlayingSong.spotifyURI && this._playbackState == PlaybackState.Playing;
  }

  playSong(song: Song): void {
    this.songService.playSong(song);
  }

  pauseSong(song: Song): void {
    this.songService.pauseSong(song);
  }

}
