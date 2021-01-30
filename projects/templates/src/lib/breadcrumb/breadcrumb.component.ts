import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Breadcrumb } from './model';

@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-breadcrumb' },
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumb!: Breadcrumb[];
  @Input() heading!: string;
  constructor() {}

  ngOnInit(): void {}
}
