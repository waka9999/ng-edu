import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderNavbarComponent,
    HeaderLogoComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
