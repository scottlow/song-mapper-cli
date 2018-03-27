import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatStepperModule,
  MatSidenavModule,
  MatInputModule,
  MatAutocompleteModule,
  MatListModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatSliderModule
  ]
})
export class MaterialModule {}