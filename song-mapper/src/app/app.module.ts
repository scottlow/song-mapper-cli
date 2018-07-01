import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './sidebar/navbar/navbar.component';
import { LoginComponent } from './main-view/login/login.component';
import { HomeComponent } from './main-view/home/home.component';
import { ErrorPageComponent } from './main-view/error-page/error-page.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage.service';
import { MapComponent } from './main-view/map/map.component';

import { AgmCoreModule } from '@agm/core';
import { NewMemoryComponent } from './sidebar/new-memory/new-memory.component';
import { LocationService } from './services/location.service';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidebarService } from './services/sidebar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotifyService } from './services/spotify.service';
import { MemoryService } from './services/memory.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/auth.interceptor';
import { ViewMemoriesComponent } from './sidebar/view-memories/view-memories.component';
import { PlayerComponent } from './player/player.component';
import { MemoriesComponent } from './main-view/memories/memories.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { DeviceListComponent } from './player/device-list/device-list.component';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ErrorPageComponent,
    MapComponent,
    NewMemoryComponent,
    ViewMemoriesComponent,
    PlayerComponent,
    MemoriesComponent,
    DeviceListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYku9lU2axlHPxksk1T5cHdwdKjgLVXlQ',
      libraries: ['places']
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DeviceDetectorModule.forRoot()

  ],
  providers: [
    AuthService,
    StorageService,
    LocationService,
    SidebarService,
    SpotifyService,
    MemoryService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    MessageService
  ],
  entryComponents: [
    PlayerComponent,
    DeviceListComponent,
    ViewMemoriesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
