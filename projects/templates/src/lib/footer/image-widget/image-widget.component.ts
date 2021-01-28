import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ImageWidget } from '../model';

@Component({
  selector: 'ng-image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-image-widget' },
})
export class ImageWidgetComponent implements OnInit {
  @Input() image!: ImageWidget|null;
  constructor() {}

  ngOnInit(): void {}
}
