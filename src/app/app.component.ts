import { Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  NavigationCancel,
  NavigationError,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { carouselItems } from '@core/models/carousel';
import { Container } from '@core/models/grid';
import { navbarItems } from '@core/models/header';
import { signItems } from '@core/models/sign-items';
import { ConfigService } from '@core/services/config.service';
import { InjectBase } from '@core/shared/inject.base';
import { CarouselItem } from 'projects/templates/src/lib/carousel/model';
import { ProgressBarComponent } from 'projects/templates/src/lib/progress-bar';
import { Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends InjectBase implements OnInit {
  signItems = signItems;
  navbarItems = navbarItems;

  @ViewChild('progressbar', { static: true })
  progressbar!: ProgressBarComponent;

  carouselItems$!: Observable<CarouselItem[]>;

  constructor(
    injector: Injector,
    private config: ConfigService,
    private title: Title,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.initConfig();
    this.initProgressbar();

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
    this.initCarousel();
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

  private initProgressbar() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.progressbar.show();
      }
      if (
        event instanceof RouteConfigLoadEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ) {
        this.progressbar.hide();
      }
    });
  }

  private updateLayoutForMediaChange(): void {
    console.log('meida change');
  }
  private updateLayoutForHandSetChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, Container.Handset);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Tablet);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Web);
  }
  private updateLayoutForTabletChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, Container.Tablet);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Web);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Handset);
  }
  private updateLayoutForWebChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, Container.Web);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Tablet);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Handset);
  }

  private initCarousel(): void {
    this.carouselItems$ = of(carouselItems);
  }
}
