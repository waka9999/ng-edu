import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export function carouselInterval(fun: () => void): void {
  interval(600)
    .pipe(take(1))
    .subscribe(() => {
      fun();
    });
}

export function carouselSettingState(fun: () => void): void {
  interval(100)
    .pipe(take(1))
    .subscribe(() => {
      fun();
    });
}

export function carouselSkipInterval(fun: () => void): void {
  interval(5000)
    .pipe(take(1))
    .subscribe(() => {
      fun();
    });
}
