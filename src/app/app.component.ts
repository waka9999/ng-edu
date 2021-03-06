import { Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { imageWidget, linksWidgets } from '@core/models/footer';
import { Container } from '@core/models/grid';
import { navbarItems } from '@core/models/header';
import { signItems } from '@core/models/sign-items';
import { ConfigService } from '@core/services/config.service';
import { InjectBase } from '@core/shared/inject.base';
import { ImageWidget, LinksWidget } from 'projects/templates/src/lib/footer';
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
  showMenu = false;
  sideNavMode: 'over' | 'push' | 'side' = 'over';

  @ViewChild('progressbar', { static: true })
  progressbar!: ProgressBarComponent;

  footerLinks$!: Observable<LinksWidget[]>;
  footerImage$!: Observable<ImageWidget>;

  constructor(
    injector: Injector,
    private config: ConfigService,
    private title: Title,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectionRef: ChangeDetectorRef
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
    this.initFooter();
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
  private updateLayoutForWebChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, Container.Web);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Tablet);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Handset);

    this.showMenu = false;
    this.sideNavMode = 'side';
    this.changeDetectionRef.markForCheck();
  }

  private updateLayoutForTabletChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, Container.Tablet);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Web);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Handset);

    this.showMenu = true;
    this.sideNavMode = 'side';
    this.changeDetectionRef.markForCheck();
  }

  private updateLayoutForHandSetChange(): void {
    this.renderer.addClass(this.elementRef.nativeElement, Container.Handset);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Tablet);
    this.renderer.removeClass(this.elementRef.nativeElement, Container.Web);

    this.showMenu = true;
    this.sideNavMode = 'over';
    this.changeDetectionRef.markForCheck();
  }

  private initFooter(): void {
    this.footerLinks$ = of(linksWidgets);
    this.footerImage$ = of(imageWidget);
  }
}
