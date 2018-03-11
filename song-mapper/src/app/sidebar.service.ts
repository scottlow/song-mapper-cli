import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
  private _isSidebarOpen = new Subject<Boolean>();
  sidebar = this._isSidebarOpen.asObservable();

  constructor() { }

  openSidebar(): void {
    this._isSidebarOpen.next(true);
  }

  closeSidebar(): void {
    this._isSidebarOpen.next(false);
  }
}