import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ng-header-menu',
  templateUrl: './header-menu.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-header-menu' },
})
export class HeaderMenuComponent {
  @Output() sidenavToggle = new EventEmitter(true);

  click() {
    this.sidenavToggle.emit();
  }
}
