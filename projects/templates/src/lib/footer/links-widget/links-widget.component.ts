import { Input } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { LinksWidget } from '../model';

@Component({
  selector: 'ng-links-widget',
  templateUrl: './links-widget.component.html',
  styleUrls: ['./links-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-links-widget' },
})
export class LinksWidgetComponent implements OnInit {
  @Input() widget!: LinksWidget;

  constructor() {}

  ngOnInit(): void {}
}
