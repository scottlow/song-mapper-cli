import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Song } from '../app.models';
import { PlaybackState } from '../app.constants';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  private _currentlyPlayingSong: Song;
  private _playbackState: PlaybackState;
  private _currentVolume: Number;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private spotifyService: SpotifyService,
    private bottomSheet: MatBottomSheet,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {

    // Subscribe to current song
    this.spotifyService.currentlyPlayingSong.pipe(takeUntil(this.ngUnsubscribe)).subscribe(currentlyPlayingSong => {
      this._currentlyPlayingSong = currentlyPlayingSong;
    });

    // Subscribe to current playback state
    this.spotifyService.playbackState.pipe(takeUntil(this.ngUnsubscribe)).subscribe(playbackState => {
      this._playbackState = playbackState;
    });

    // Subscribe to current volume
    this.spotifyService.currentVolume.pipe(takeUntil(this.ngUnsubscribe)).subscribe(currentVolume => {
      this._currentVolume = currentVolume;
    }); 
  }

  shouldShowPauseButton(): Boolean {
    return this._playbackState == PlaybackState.Playing;
  }

  shouldShowVolumeSlider(): Boolean {
    return !this.deviceService.isMobile();
  }

  setVolume(): void {
    this.spotifyService.setVolume(this._currentVolume);
  }

  openDeviceList(): void {
    this.bottomSheet.open(DeviceListComponent);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
