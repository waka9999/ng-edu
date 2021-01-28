import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ImageWidget, LinksWidget } from './model';

@Component({
  selector: 'ng-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-footer' },
})
export class FooterComponent implements OnInit {
  @Input() widgets$!: Observable<LinksWidget[]>;
  @Input() image$!: Observable<ImageWidget>;

  constructor() {}

  ngOnInit(): void {}
}
