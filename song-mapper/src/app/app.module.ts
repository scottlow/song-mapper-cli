import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { NewMemoryComponent } from './new-memory/new-memory.component';
import { LocationService } from './location.service';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidebarService } from './sidebar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotifyService } from './spotify.service';
import { MemoryService } from './memory.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth.interceptor';
import { ViewMemoriesComponent } from './view-memories/view-memories.component';
import { SongService } from './song.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ErrorPageComponent,
    MapComponent,
    NewMemoryComponent,
    ViewMemoriesComponent
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
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    StorageService,
    LocationService,
    SidebarService,
    SpotifyService,
    MemoryService,
    SongService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
