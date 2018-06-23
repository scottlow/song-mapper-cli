import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { MemoryLocation, Song, Memory, PinLocation } from '../../app.models';
import { SidebarService } from '../../services/sidebar.service';
import { Constants, PlaybackState } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { SpotifyService } from '../../services/spotify.service';
import { MemoryService } from '../../services/memory.service';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-view-memories',
  templateUrl: './view-memories.component.html',
  styleUrls: ['./view-memories.component.css']
})
export class ViewMemoriesComponent implements OnInit, OnDestroy {
  @Input() listClickable: Boolean = false;
  private _selectedLocation: MemoryLocation;
  private _memoriesToDisplay: Memory[] = new Array<Memory>();
  private _currentlyPlayingSong: Song;
  private _playbackState;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private locationService: LocationService,
    private http: HttpClient,
    private authService: AuthService,
    private spotifyService: SpotifyService,
    private memoryService: MemoryService
  ) {
    this._playbackState = PlaybackState.Stopped;
  }

  ngOnInit() {
    this.locationService.selectedLocation.takeUntil(this.ngUnsubscribe).subscribe(location => {
      this._selectedLocation = location;

      if (this._selectedLocation != null) {
        this.http.get<Memory[]>(Constants.API_URL + '/memories/location/' + this._selectedLocation.gId).subscribe(response => {
          this._memoriesToDisplay = response;
        });
      } else {
        // If we get here, we're displaying memories for a specific user
        this.memoryService.memories.takeUntil(this.ngUnsubscribe).subscribe(memories => {
          this._memoriesToDisplay = memories;
        });
      }
    });

    this.spotifyService.currentlyPlayingSong.takeUntil(this.ngUnsubscribe).subscribe(currentlyPlayingSong => {
      this._currentlyPlayingSong = currentlyPlayingSong;
    });

    this.spotifyService.playbackState.takeUntil(this.ngUnsubscribe).subscribe(playbackState => {
      this._playbackState = playbackState;
    });
  }

  shouldShowPauseButton(song: Song): Boolean {
    return this._currentlyPlayingSong && song.spotifyURI == this._currentlyPlayingSong.spotifyURI && this._playbackState == PlaybackState.Playing;
  }

  playSong(song: Song): void {
    this.spotifyService.playSong(song);
  }

  pauseSong(song: Song): void {
    this.spotifyService.pauseSong(song);
  }

  deleteMemory(memory: Memory): void {
    this.memoryService.deleteMemory(memory._id);
  }

  showSongLocation(location: PinLocation): void {
    location.showPin = false;
    this.locationService.updateNewMemoryPinLocation(location);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
