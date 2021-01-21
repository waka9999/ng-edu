import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselItem } from '../model';

@Component({
  selector: 'ng-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-carousel-item' },
})
export class CarouselItemComponent implements OnInit {
  @Input() item!: CarouselItem;
  constructor() {}

  ngOnInit(): void {}
}
