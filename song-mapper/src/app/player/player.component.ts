import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Song } from '../models';
import { PlaybackState } from '../app.constants';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  private _currentlyPlayingSong: Song;
  private _playbackState: PlaybackState;
  private _currentVolume: Number;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {

    // Subscribe to current song
    this.spotifyService.currentlyPlayingSong.subscribe(currentlyPlayingSong => {
      this._currentlyPlayingSong = currentlyPlayingSong;
    });

    // Subscribe to current playback state
    this.spotifyService.playbackState.subscribe(playbackState => {
      this._playbackState = playbackState;
    });

    // Subscribe to current volume
    this.spotifyService.currentVolume.subscribe(currentVolume => {
      this._currentVolume = currentVolume;
    });
  }

  shouldShowPauseButton(): Boolean {
    return this._playbackState == PlaybackState.Playing;
  }
}
