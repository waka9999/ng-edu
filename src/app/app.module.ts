import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigModule } from './app.config.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  ToolbarModule,
  ProgressBarModule,
  CarouselModule,
  HeaderModule,
  FooterModule,
} from 'projects/templates/src/public-api';
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppConfigModule.forRoot(),
    CommonModule,
    ToolbarModule,
    ProgressBarModule,
    CarouselModule,
    HeaderModule,
    FooterModule,
    MatSidenavModule,
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
