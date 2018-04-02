import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main-view/login/login.component';
import { HomeComponent } from './main-view/home/home.component';
import { ErrorPageComponent } from './main-view/error-page/error-page.component';
import { MemoriesComponent } from './main-view/memories/memories.component';
import {AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'callback', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'memories', component: MemoriesComponent, canActivate: [AuthGuard] },
  { path: 'error/:errorType', component: ErrorPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}