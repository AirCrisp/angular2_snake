import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {  } from '@angular/material';

import { AppComponent } from './app.component';
import { MatrixComponent } from './matrix.component';

import { GameService } from './game.service';

import { cRepeatDirective } from './c-repeat.directive';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    cRepeatDirective
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
