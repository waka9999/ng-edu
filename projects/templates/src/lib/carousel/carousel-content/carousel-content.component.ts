import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { customAnimation } from '../carousel.animation';
import { CarouselItem } from '../model';

@Component({
  selector: 'ng-carousel-content',
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-carousel-content' },
  animations: [customAnimation],
})
export class CarouselContentComponent implements OnInit {
  @Input() item!: CarouselItem;

  constructor() {}

  ngOnInit(): void {}
}
