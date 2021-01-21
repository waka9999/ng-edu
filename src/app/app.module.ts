import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigModule } from './app.config.module';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'projects/templates/src/lib/toolbar';
import { ProgressBarModule } from 'projects/templates/src/lib/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
