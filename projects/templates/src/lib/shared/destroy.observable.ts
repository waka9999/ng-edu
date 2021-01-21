import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class DestroyObservable implements OnDestroy {
  protected destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
