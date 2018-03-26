import { Injectable } from '@angular/core';
import { Song } from './models';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Constants } from './app.constants';

enum PlaybackState {
  Playing = 1,
  Paused,
  Stopped
}

@Injectable()
export class SongService {
  private _currentlyPlayingSong = new Subject<Song>();
  private _playbackState = new Subject<PlaybackState>();
  public currentlyPlayingSong = this._currentlyPlayingSong.asObservable();
  public playbackState = this._playbackState.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this._playbackState.next(PlaybackState.Stopped);
  }

  playSong(song: Song) {
    this.http.post(Constants.API_URL + '/spotify/playback/play', {
      uris: [song.spotifyURI]
    }).subscribe(response => {
      this._playbackState.next(PlaybackState.Playing);
      this._currentlyPlayingSong.next(song);
    });
  }

  pausePlayback(song: Song) {
    this._playbackState.next(PlaybackState.Paused);
  }
}
