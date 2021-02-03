import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error-routing.module';
import {
  BreadcrumbModule,
  SearchModule,
} from 'projects/templates/src/public-api';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, ErrorRoutingModule, BreadcrumbModule, SearchModule],
})
export class ErrorModule {}
