import { Injectable, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '@core/models/config';

export const APP_CONFIG = new InjectionToken('AppConfig');

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private subject: BehaviorSubject<Config>;

  constructor(@Inject(APP_CONFIG) private defaultConfig: Config) {
    this.subject = new BehaviorSubject(this.defaultConfig);
  }

  subject$(): Observable<Config> {
    return this.subject.asObservable();
  }
}
