import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { trigger, transition, style, animate, group, query } from '@angular/animations';
import { ScrollProgress } from './components/scroll-progress/scroll-progress';
import { SeoService } from './shared/seo.service';
import { ThemeService } from './shared/theme.service';
import { I18nService } from './shared/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ScrollProgress],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        group([
          query(':leave', [
            animate('120ms ease', style({ opacity: 0, filter: 'blur(2px)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(8px)' }),
            animate('220ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 1, transform: 'none' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class App {
  protected readonly title = signal('portfolio');

  routeKey(outlet: RouterOutlet) {
    return outlet && outlet.isActivated && outlet.activatedRoute.routeConfig?.path;
  }

  constructor(private seo: SeoService, private theme: ThemeService, private i18n: I18nService) {
    this.seo.init();
    this.theme.init();
    this.i18n.init();
  }
}
