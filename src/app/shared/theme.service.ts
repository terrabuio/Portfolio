import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(false);
  private readonly storageKey = 'theme';
  private readonly isBrowser: boolean;
  private prefersReduced = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object, @Inject(DOCUMENT) private doc: Document) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init() {
    if (!this.isBrowser) return;
    const saved = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.prefersReduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const dark = saved ? saved === 'dark' : prefersDark;
    this.apply(dark);
  }

  toggle() {
    if (!this.isBrowser) return;
    this.apply(!this.isDark());
  }

  private apply(dark: boolean) {
    this.isDark.set(dark);
    const root = this.doc.documentElement.classList;
    if (!this.prefersReduced) {
      root.add('theme-transition');
      setTimeout(() => root.remove('theme-transition'), 250);
    }
    root.toggle('dark', dark);
    localStorage.setItem(this.storageKey, dark ? 'dark' : 'light');
  }
}
