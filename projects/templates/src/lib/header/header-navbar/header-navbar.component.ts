import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarItem } from '../model';

@Component({
  selector: 'ng-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-header-navbar' },
})
export class HeaderNavbarComponent implements OnInit {
  @Input() navbarItems!: NavbarItem[];
  constructor() {}

  ngOnInit(): void {}
}
