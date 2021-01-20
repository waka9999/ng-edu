import { Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { signItems } from '@core/models/sign-items';
import { ConfigService } from '@core/services/config.service';
import { InjectBase } from '@core/shared/inject.base';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends InjectBase implements OnInit {
  signItems = signItems;
  
  constructor(
    injector: Injector,
    private config: ConfigService,
    private title: Title,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initConfig();
    this.initLayout(Breakpoints.Web, this.updateLayoutForWebChange.bind(this));
    this.initLayout(
      Breakpoints.Handset,
      this.updateLayoutForHandSetChange.bind(this)
    );
    this.initLayout(
      Breakpoints.Tablet,
      this.updateLayoutForTabletChange.bind(this)
    );
    this.mediaQuery(
      '(max-width: 960px)',
      this.updateLayoutForMediaChange.bind(this)
    );
  }

  private initConfig(): void {
    this.config
      .subject$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((c) => {
        this.title.setTitle(c!.name);
        this.renderer.addClass(this.elementRef.nativeElement, c.theme);
      });
  }

  private updateLayoutForMediaChange(): void {
    console.log('meida change');
  }
  private updateLayoutForHandSetChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'ng-handset');
    this.renderer.removeClass(this.elementRef.nativeElement, 'ng-tablet');
    this.renderer.removeClass(this.elementRef.nativeElement, 'ng-web');
  }
  private updateLayoutForTabletChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'ng-tablet');
    this.renderer.removeClass(this.elementRef.nativeElement, 'ng-web');
    this.renderer.removeClass(this.elementRef.nativeElement, 'ng-handset');
  }
  private updateLayoutForWebChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'ng-web');
    this.renderer.removeClass(this.elementRef.nativeElement, 'ng-tablet');
    this.renderer.removeClass(this.elementRef.nativeElement, 'ng-handset');
  }
}
