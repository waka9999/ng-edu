import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselItem } from '../model';
import { carouselInterval } from '../util';

@Component({
  selector: 'ng-carousel-indicators',
  templateUrl: './carousel-indicators.component.html',
  styleUrls: ['./carousel-indicators.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-carousel-indicators' },
})
export class CarouselIndicatorsComponent implements OnInit {
  @Input() items!: CarouselItem[];
  @Output() indicatorSelect = new EventEmitter();
  private select = false;

  current: number = 0;
  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.items ? this.items : [];
  }

  click(index: number): void {
    if (!this.select) {
      this.select = true;
      this.indicatorSelect.emit(index);
      carouselInterval(() => (this.select = false));
    }
  }

  change(current: number): void {
    this.current = current;
    this.select = true;
    this.changeDetectionRef.markForCheck();

    carouselInterval(() => (this.select = false));
  }
}
