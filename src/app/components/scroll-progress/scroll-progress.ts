import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgStyle } from '@angular/common';

@Component({
  selector: 'scroll-progress',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './scroll-progress.html'
})
export class ScrollProgress implements OnInit {
  progress = 0;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      this.progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}
