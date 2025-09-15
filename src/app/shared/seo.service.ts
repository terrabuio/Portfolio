import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        const data = this.collectRouteData(this.route);
        const title = typeof data['title'] === 'string' ? (data['title'] as string) : 'Bernardo — Portfólio';
        const description = typeof data['description'] === 'string'
          ? (data['description'] as string)
          : 'Portfólio de Bernardo — Desenvolvedor Full Stack / Mobile / BI.';

        this.title.setTitle(title);
        this.setTag('description', description);
        this.setTag('og:title', title);
        this.setTag('og:description', description);
        this.setTag('og:type', 'website');
        if (this.isBrowser) {
          const url = this.currentUrl();
          if (url) this.setTag('og:url', url);
          this.updateCanonical(url);
        }
        this.setTag('twitter:card', 'summary_large_image');
        this.setTag('twitter:title', title);
        this.setTag('twitter:description', description);
      });
  }

  private collectRouteData(route: ActivatedRoute): Record<string, unknown> {
    let r = route.firstChild;
    let data: Record<string, unknown> = {};
    while (r) {
      data = { ...data, ...(r.snapshot.data ?? {}) };
      r = r.firstChild!;
    }
    return data;
  }

  private setTag(name: string, content: string) {
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      this.meta.updateTag({ property: name, content });
    } else {
      this.meta.updateTag({ name, content });
    }
  }

  private currentUrl(): string | null {
    if (!this.isBrowser) return null;
    return this.document.location?.href ?? null;
  }

  private updateCanonical(url: string | null) {
    if (!url) return;
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
