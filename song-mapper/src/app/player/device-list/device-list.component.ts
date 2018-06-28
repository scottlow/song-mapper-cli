import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSelectionListChange } from '@angular/material';
import { SpotifyService } from '../../services/spotify.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  private _deviceList;
  private _activeDevice;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private spotifyService: SpotifyService
  ) { }

  handleDeviceSelection(event: MatSelectionListChange) {
    if (event.option.selected) {
      event.source.deselectAll();
      event.option._setSelected(true);
      this.spotifyService.setActiveDevice(event.option.value)
    } else {
      // Disable complete deselection
      event.option._setSelected(true);
    }
  }

  ngOnInit() {
    this._deviceList = this.spotifyService.deviceList;
    this.spotifyService.activeDevice.pipe(takeUntil(this.ngUnsubscribe)).subscribe(activeDevice => {
      this._activeDevice = activeDevice;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
