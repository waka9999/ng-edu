import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselIndicatorsComponent } from './carousel-indicators/carousel-indicators.component';
import { MatButtonModule } from '@angular/material/button';
import { CarouselContentComponent } from './carousel-content/carousel-content.component';

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselItemComponent,
    CarouselIndicatorsComponent,
    CarouselContentComponent,
  ],
  imports: [CommonModule, MatButtonModule],
  exports: [CarouselComponent],
})
export class CarouselModule {}
