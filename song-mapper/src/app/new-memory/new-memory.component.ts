import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { LocationService } from '../location.service';
import { MapLocation } from '../models';
import { SpotifyService } from '../spotify.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-new-memory',
  templateUrl: './new-memory.component.html',
  styleUrls: ['./new-memory.component.css']
})
export class NewMemoryComponent implements OnInit {

  @ViewChild("placeSearch")
  public placeSearchElementRef: ElementRef;
  private _results;
  search = new FormControl();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: LocationService,
    private spotifyService: SpotifyService,
  ) { }

  ngOnInit() {
    // Subscribe to value changes
    this.search.valueChanges.debounceTime(500).subscribe(searchQuery => {
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

}
