import { Component, OnInit, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LocationService } from '../../services/location.service';
import { PinLocation, Song, MemoryLocation } from '../../app.models';
import { FormBuilder, Validators } from '@angular/forms';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import { MatVerticalStepper } from '@angular/material';
import { SidebarService } from '../../services/sidebar.service';
import { MemoryService } from '../../services/memory.service';
import { SpotifyService } from '../../services/spotify.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-memory',
  templateUrl: './new-memory.component.html',
  styleUrls: ['./new-memory.component.css']
})
export class NewMemoryComponent implements OnInit, OnDestroy {

  @ViewChild("placeSearch") private placeSearchElementRef: ElementRef;
  @ViewChild("stepper") private stepper: MatVerticalStepper
  private _results;
  private _currentlyPlayingSong;
  private _memoryLocation : MemoryLocation;
  private ngUnsubscribe: Subject<any> = new Subject();

  private placeForm = this.fb.group({
    placeSearch: ['', Validators.required ]
  })

  private spotifyForm = this.fb.group({
    spotifySearch: ['', Validators.required ]
  })

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: LocationService,
    private spotifyService: SpotifyService,
    private fb: FormBuilder,
    private sidebarService: SidebarService,
    private memoryService: MemoryService
  ) { }

  ngOnInit() {
    this.sidebarService.sidebar.subscribe(isSidebarOpen => {
      if(!isSidebarOpen) this.stepper.reset();
    });

    this.spotifyService.currentlyPlayingSong.pipe(takeUntil(this.ngUnsubscribe)).subscribe(currentlyPlayingSong => {
      this._currentlyPlayingSong = currentlyPlayingSong;
    });


    // Subscribe to value changes
    this.spotifyForm.get('spotifySearch').valueChanges
    .pipe(
      debounceTime(500),
      map(value => typeof value === 'string' || value === null ? value : value.name)
    )
    .subscribe(searchQuery => {
      this._results = this.spotifyService.getSpotifySearchResults(searchQuery).pipe(map(response => response.tracks.items));
    });

    // Load the map
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.placeSearchElementRef.nativeElement, {
        types: []
      });

      // If the map changes due to an autocomplete change, drop a pin
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          let memoryMapLocation = new PinLocation(place.geometry.location.lat(), place.geometry.location.lng());
          this._memoryLocation = new MemoryLocation(place.name, place.id, place.formatted_address, memoryMapLocation);
          this.locationService.dropPin(memoryMapLocation);
        });
      });
    });
  }

  getTrackString(track: any): string | undefined {
    return track ? (track.name ? track.name : track.title) + ' - ' + (track.artists ? track.artists[0].name : track.artist) : undefined;
  }

  createMemory() : void {
    let trackInfo = this.spotifyForm.get('spotifySearch').value;
    let song = trackInfo instanceof Song ? trackInfo : new Song(
      trackInfo.name,
      trackInfo.id,
      trackInfo.artists[0].name,
      trackInfo.uri,
      trackInfo.album.images[2].url,
      true
    );
    this.memoryService.createMemory(this._memoryLocation, song).pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      this.sidebarService.closeSidebar();
    });
  }
  
  getCurrentlyPlayingTrack() {
    this.spotifyForm.get('spotifySearch').setValue(this._currentlyPlayingSong);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
