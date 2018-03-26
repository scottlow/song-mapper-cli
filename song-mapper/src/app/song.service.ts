import { Injectable } from '@angular/core';
import { Song } from './models';
import { HttpClient } from '@angular/common/http';
import { Constants, PlaybackState } from './app.constants';
import { StorageService } from './storage.service';
import { } from 'spotify-api'
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SongService {
  private _currentlyPlayingSong = new ReplaySubject<Song>();
  private _playbackState = new ReplaySubject<PlaybackState>();
  public currentlyPlayingSong = this._currentlyPlayingSong.asObservable();
  public playbackState = this._playbackState.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    this._playbackState.next(PlaybackState.Stopped);
    this.getCurrentSong();
  }

  getCurrentSong(): void {
    this.http.get<any>(Constants.API_URL + '/spotify/playback', {
    }).subscribe(response => {
      let song: SpotifyApi.TrackObjectFull = response.item;
      let track = new Song(song.name, song.id, song.artists[0].name, song.uri, song.album.images[2].url);
      this._currentlyPlayingSong.next(new Song(song.name, song.id, song.artists[0].name, song.uri, song.album.images[2].url));
      this._playbackState.next(song ? response.is_playing ? PlaybackState.Playing : PlaybackState.Paused : PlaybackState.Stopped);
    });   
  }

  playSong(song: Song) {
    this.http.post(Constants.API_URL + '/spotify/playback/play', {
      uris: [song.spotifyURI]
    }).subscribe(response => {
      this._playbackState.next(PlaybackState.Playing);
      this._currentlyPlayingSong.next(song);
    });
  }

  pauseSong(song: Song) {
    this.http.post(Constants.API_URL + '/spotify/playback/pause', {
      uris: [song.spotifyURI]
    }).subscribe(response => {
      this._playbackState.next(PlaybackState.Paused);
    });

  }
}
