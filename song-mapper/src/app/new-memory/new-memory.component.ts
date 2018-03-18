import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { LocationService } from '../location.service';
import { MapLocation } from '../models';
import { SpotifyService } from '../spotify.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {map} from 'rxjs/operators/map';
import { MatAutocompleteSelectedEvent, MatVerticalStepper } from '@angular/material';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-new-memory',
  templateUrl: './new-memory.component.html',
  styleUrls: ['./new-memory.component.css']
})
export class NewMemoryComponent implements OnInit {

  @ViewChild("placeSearch") private placeSearchElementRef: ElementRef;
  @ViewChild("stepper") private stepper: MatVerticalStepper
  private _results;

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
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    // Subscribe to value changes
    this.spotifyForm.get('spotifySearch').valueChanges.debounceTime(500)
    .pipe(
      map(value => typeof value === 'string' || value === null ? value : value.name)
    )
    .subscribe(searchQuery => {
      this._results = this.spotifyService.getSpotifySearchResults(searchQuery).map(response => response.tracks.items);
    });

    // Load the map
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.placeSearchElementRef.nativeElement, {
        types: ["address"]
      });

      // If the map changes due to an autocomplete change, drop a pin
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.locationService.dropPin(new MapLocation(place.geometry.location.lat(), place.geometry.location.lng()));
        });
      });
    });
  }

  getTrackString(track: any): string | undefined {
    return track ? track.name + ' - ' + track.artists[0].name : undefined;
  }

  createMemory() : void {
    console.log(this.spotifyForm.get('spotifySearch').value);
    this.sidebarService.closeSidebar();
    this.stepper.reset();
  }
}
