import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderMenuComponent } from './header-menu/header-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderLogoComponent,
    HeaderNavbarComponent,
    HeaderMenuComponent,
  ],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [HeaderComponent, HeaderNavbarComponent, HeaderMenuComponent],
})
export class HeaderModule {}
