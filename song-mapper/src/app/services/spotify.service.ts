import { Injectable } from '@angular/core';
import { Song } from '../app.models';
import { HttpClient } from '@angular/common/http';
import { Constants, PlaybackState } from '../app.constants';
import { StorageService } from './storage.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SpotifyService {
  private _currentlyPlayingSong = new BehaviorSubject<Song>(undefined);
  private _playbackState = new BehaviorSubject<PlaybackState>(PlaybackState.Stopped);
  private _currentVolume = new BehaviorSubject<Number>(0);
  public currentlyPlayingSong = this._currentlyPlayingSong.asObservable();
  public playbackState = this._playbackState.asObservable();
  public currentVolume = this._currentVolume.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  getSpotifySearchResults(query: string): Observable<any> {
    return this.http.get(Constants.API_URL + '/spotify/search', { params: { q: query } });
  }

  getCurrentSong(): void {
    if (this._currentlyPlayingSong.getValue() == undefined) {
      this.http.get<any>(Constants.API_URL + '/spotify/playback', {
      }).subscribe(response => {
        if (response) {
          let device = response.device;
          this._currentVolume.next(device.volume_percent);

          let songObj: SpotifyApi.TrackObjectFull = response.item;
          let song = new Song(songObj.name, songObj.id, songObj.artists[0].name, songObj.uri, songObj.album.images[2].url);
          this._currentlyPlayingSong.next(song);
          this._playbackState.next(songObj ? response.is_playing ? PlaybackState.Playing : PlaybackState.Paused : PlaybackState.Stopped);
        }
      });
    }
  }

  resumePlayback() {
    var currentSongValue = this._currentlyPlayingSong.getValue();
    this.http.post(Constants.API_URL + '/spotify/playback/play', undefined).subscribe(response => {
      this._playbackState.next(PlaybackState.Playing);
    });
  }

  playSong(song: Song) {
    var currentSongValue = this._currentlyPlayingSong.getValue();
    this.http.post(Constants.API_URL + '/spotify/playback/play', {
      uris: currentSongValue && currentSongValue.spotifyURI == song.spotifyURI ? undefined : [song.spotifyURI]
    }).subscribe(response => {
      this._playbackState.next(PlaybackState.Playing);
      this._currentlyPlayingSong.next(song);
    });
  }

  pauseSong(song: Song) {
    this.http.post(Constants.API_URL + '/spotify/playback/pause', undefined).subscribe(response => {
      this._playbackState.next(PlaybackState.Paused);
    });
  }

  setVolume(newVolume: Number) {
    this.http.post(Constants.API_URL + '/spotify/playback/volume', {volume_percent: newVolume}).subscribe();
  }
}
