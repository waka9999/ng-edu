import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, interval, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '../shared/destroy.observable';
import { CarouselIndicatorsComponent } from './carousel-indicators/carousel-indicators.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { carousel } from './carousel.animation';
import { CarouselItem } from './model';
import { carouselInterval, carouselSettingState, carouselSkipInterval } from './util';

@Component({
  selector: 'ng-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-carousel' },
  animations: [carousel],
})
export class CarouselComponent extends DestroyObservable implements OnInit {
  @Input() items$!: Observable<CarouselItem[]>;
  items!: CarouselItem[];
  @ViewChildren(CarouselItemComponent, { read: ElementRef })
  carouselChildren!: QueryList<ElementRef>;
  @ViewChild(CarouselIndicatorsComponent)
  indicators!: CarouselIndicatorsComponent;
  @ViewChild('prevClick', { static: true })
  prevClick!: ElementRef;
  @ViewChild('nextClick', { static: true })
  nextClick!: ElementRef;

  current = 0;
  hover = false;
  sliding = false;
  fading = false;
  skip = false;

  constructor(
    private elementRef: ElementRef,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.initCarousel();
    this.initHoverEvent();
    this.initClickEvent();
  }

  indicatorClick(event: any): void {
    if (this.fading || this.sliding) {
      return;
    }

    if (this.current === event) {
      return;
    }

    const prev = this.current;
    this.current = event;
    const next = this.nextIndex();

    if (this.items[prev].state !== 'fadeIn') {
      this.items[prev].state = 'fadeIn';
    }

    if (this.items[this.current].state != 'fadeOut') {
      this.items[this.current].state = 'fadeOut';
    }
    this.changeDetectionRef.markForCheck();

    this.fadingEffect(prev, next);
  }

  private initCarousel(): void {
    this.items$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
      if (items) {
        this.items = items;
      }
      if (this.items!.length === 1) {
        this.items[0].state = 'fadeIn';
        return;
      }

      this.items[0].state = 'fadeIn';
      this.items[1].state = 'fadeOut';
      this.updateFadeState();
    });
  }

  private updateFadeState(): void {
    interval(6000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.sliding || this.hover || this.fading || this.skip) {
          return;
        }

        if (this.current++ >= this.items.length - 1) {
          this.current = 0;
        }

        const prev = this.prevIndex();
        const next = this.nextIndex();

        if (this.items[prev].state !== 'fadeIn') {
          this.items[prev].state = 'fadeIn';
        }

        if (this.items[this.current].state != 'fadeOut') {
          this.items[this.current].state = 'fadeOut';
        }

        this.changeDetectionRef.markForCheck();

        this.fadingEffect(prev, next);
      });
  }

  private fadingEffect(prev: number, next: number): void {
    this.fading = true;

    carouselSettingState(() => {
      this.items[prev].state = 'fadeOut';
      this.items[this.current].state = 'fadeIn';
      this.items[next].state = 'fadeOut';
      this.changeDetectionRef.markForCheck();

      this.indicators.change(this.current);
      carouselInterval(() => (this.fading = false));
    });
  }

  private prevIndex(): number {
    return this.current === 0 ? this.items.length - 1 : this.current - 1;
  }

  private nextIndex(): number {
    return this.current >= this.items.length - 1 ? 0 : this.current + 1;
  }

  private initHoverEvent(): void {
    fromEvent(this.elementRef.nativeElement, 'mouseenter')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.hover = true;
      });
    fromEvent(this.elementRef.nativeElement, 'mouseleave')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.hover = false;
      });
  }

  private initClickEvent(): void {
    fromEvent(this.prevClick.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.sliding || this.fading) {
          return;
        }
        let prev = this.current - 1;

        if (prev < 0) {
          prev = this.items.length - 1;
        }

        this.updateSlideState(prev, 'prevIn');
        this.prevSlidingEffect(prev);
      });
    fromEvent(this.nextClick.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.sliding || this.fading) {
          return;
        }
        let next = this.current + 1;

        if (next >= this.items.length) {
          next = 0;
        }

        this.updateSlideState(next, 'nextIn');
        this.nextSlidingEffect(next);
      });
  }

  private updateSlideState(direction: number, state: string): void {
    this.items[direction].state = state;
    this.items[this.current].state = 'slideIn';
    this.changeDetectionRef.markForCheck();
  }

  private prevSlidingEffect(prev: number): void {
    this.sliding = true;
    this.skip = true;
    carouselSettingState(() => {
      this.items[prev].state = 'slideIn';
      this.items[this.current].state = 'prevOut';
      if (this.current-- <= 0) {
        this.current = this.items.length - 1;
      }
      this.changeDetectionRef.markForCheck();

      this.indicators.change(this.current);
      carouselInterval(() => (this.sliding = false));
      carouselSkipInterval(()=>{this.skip=false});
    });
  }

  private nextSlidingEffect(next: number): void {
    this.sliding = true;
    this.skip = true;
    carouselSettingState(() => {
      this.items[this.current].state = 'nextOut';
      this.items[next].state = 'slideIn';
      if (this.current++ >= this.items.length - 1) {
        this.current = 0;
      }
      this.changeDetectionRef.markForCheck();

      this.indicators.change(this.current);
      carouselInterval(() => (this.sliding = false));
      carouselSkipInterval(()=>{this.skip=false});
    });
  }
}
