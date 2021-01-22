import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DestroyObservable } from '../shared/destroy.observable';
import { scrollEvent } from './util';

@Component({
  selector: 'ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ng-header' },
})
export class HeaderComponent extends DestroyObservable implements OnInit {
  @Input() padTop!: number;
  @Input() scope!: number;
  private lastYOffset = 0;
  private scrollDirection = -1;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.padTop = this.padTop ? this.padTop : 0;
    this.scope = this.scope ? this.scope : 480;
    scrollEvent(this.destroy$, this.headerTransform.bind(this));
  }
  private headerTransform(): void {
    if (this.headerAfterPosition()) {
      if (this.isScrollDown() && this.scrollDirection !== 1) {
        this.scrollDownTransform();
      } else if (this.isScrollUp() && this.scrollDirection !== 0) {
        this.scrollUpTransform();
      }
    } else {
      this.defaultHeaderStyle();
    }
    this.lastYOffset = Math.ceil(window.pageYOffset);
  }

  private isScrollDown(): boolean {
    return Math.ceil(window.pageYOffset) > this.lastYOffset;
  }

  private scrollDownTransform(): void {
    this.scrollDirection = 1;
    this.renderer.addClass(this.elementRef.nativeElement, 'transform-up');
    this.renderer.removeClass(this.elementRef.nativeElement, 'transform-down');
    this.renderer.removeClass(this.elementRef.nativeElement, 'light-header');
  }

  private scrollUpTransform(): void {
    this.scrollDirection = 0;
    this.renderer.addClass(this.elementRef.nativeElement, 'sticky-top');
    this.renderer.addClass(this.elementRef.nativeElement, 'light-header');
    this.renderer.addClass(this.elementRef.nativeElement, 'transform-down');
    this.renderer.removeClass(this.elementRef.nativeElement, 'transform-up');
  }

  private defaultHeaderStyle(): void {
    this.scrollDirection = -1;
    if (this.headerBeforePosition()) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'sticky-top');
      this.renderer.removeClass(this.elementRef.nativeElement, 'light-header');
    }
  }

  private isScrollUp(): boolean {
    return Math.ceil(window.pageYOffset) < this.lastYOffset;
  }

  private headerAfterPosition(): boolean {
    return window.pageYOffset > this.padTop;
  }

  private headerBeforePosition(): boolean {
    return window.pageYOffset < this.padTop;
  }
}
