import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatStepperModule,
  MatSidenavModule,
  MatInputModule,
  MatAutocompleteModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule
  ]
})
export class MaterialModule {}