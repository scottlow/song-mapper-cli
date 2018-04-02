import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Constants } from '../app.constants';

@Injectable()
export class SidebarService {
  private _isSidebarOpen = new Subject<Boolean>();
  sidebar = this._isSidebarOpen.asObservable();
  private _currentState: String;

  constructor() { }

  openSidebar(state: String): void {
    this._currentState = state;
    this._isSidebarOpen.next(true);
  }

  closeSidebar(): void {
    this._isSidebarOpen.next(false);
  }

  getCurrentState(): String {
    return this._currentState;
  }
}