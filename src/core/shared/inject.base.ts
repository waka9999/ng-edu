import {
  OnDestroy,
  Directive,
  Injector,
  ChangeDetectorRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from './destroy.observable';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';

@Directive()
export abstract class InjectBase
  extends DestroyObservable
  implements OnDestroy {
  private breakpointObserver!: BreakpointObserver;
  private changeDetectorRef!: ChangeDetectorRef;
  private mediaMatcher!: MediaMatcher;
  private removeEventListeners: { (): void }[];
  constructor(injector: Injector) {
    super();
    this.breakpointObserver = injector.get(BreakpointObserver);
    this.mediaMatcher = injector.get(MediaMatcher);
    this.changeDetectorRef = injector.get(ChangeDetectorRef);
    this.removeEventListeners = [];
  }

  ngOnDestroy(): void {
    this.removeEventListeners.forEach((remove, i, listeners) => {
      remove();
    });
    super.ngOnDestroy();
  }

  protected initLayout(breakpoint?: string, func?: () => void): void {
    if (func && breakpoint) {
      this.breakpointObserver
        .observe([breakpoint])
        .pipe(takeUntil(this.destroy$))
        .subscribe((c) => {
          if (this.breakpointObserver.isMatched(breakpoint)) {
            func();
          }
        });
      return;
    }
    if (func) {
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
        .pipe(takeUntil(this.destroy$))
        .subscribe((c) => {
          func();
        });
      return;
    }
  }

  public mediaQuery(match: string, func: () => void): void {
    const mediaQueryList = this.mediaMatcher.matchMedia(match);
    const listener = () => {
      if (mediaQueryList.matches) {
        func();
        this.changeDetectorRef.detectChanges();
      }
    };
    mediaQueryList.addEventListener('change', listener);
    this.removeEventListeners.push(() => {
      console.log('removel change listener');
      mediaQueryList.removeEventListener('change', listener);
    });
  }
}
