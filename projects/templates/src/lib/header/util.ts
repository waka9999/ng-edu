import { Observable, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

export function scrollEvent(destroy$: Observable<any>, func: Function): void {
  fromEvent(window, 'scroll')
    .pipe(takeUntil(destroy$))
    .subscribe(() => {
      func();
    });
}