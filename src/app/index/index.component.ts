import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { carouselItems } from '@core/models/carousel';
import { CarouselItem } from 'projects/templates/src/public-api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  carouselItems$!: Observable<CarouselItem[]>;

  constructor() {}

  ngOnInit(): void {
    this.initCarousel();
  }

  private initCarousel(): void {
    this.carouselItems$ = of(carouselItems);
  }
}
