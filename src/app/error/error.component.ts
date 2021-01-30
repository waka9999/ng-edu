import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { errorBreadcrumb } from '@core/models/breadcrumb';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  breadcrumb = errorBreadcrumb;
  constructor() {}

  ngOnInit(): void {}
}
