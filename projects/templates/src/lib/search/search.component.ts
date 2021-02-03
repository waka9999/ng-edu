import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-search' },
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
