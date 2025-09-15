import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input('appScrollReveal') animation: 'fade-up' | 'fade' | 'zoom-in' | '' = 'fade-up';
  @Input() delay = 0; // ms
  @Input() threshold = 0.2;

  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLElement>,
    private r2: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const node = this.el.nativeElement;
    this.r2.addClass(node, 'reveal');
    if (this.animation) this.r2.addClass(node, `reveal-${this.animation}`);
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      // On server/no-IO env: reveal immediately to avoid SSR errors
      this.r2.addClass(node, 'reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => this.r2.addClass(node, 'reveal-visible'), this.delay);
            this.observer?.unobserve(node);
          }
        });
      },
      { threshold: this.threshold }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
