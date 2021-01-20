import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ng-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-progress-bar' },
})
export class ProgressBarComponent implements OnInit {
  visible = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  show(): void {
    this.visible = true;
    this.changeDetectorRef.markForCheck();
  }

  hide(): void {
    this.visible = false;
    this.changeDetectorRef.markForCheck();
  }
}
