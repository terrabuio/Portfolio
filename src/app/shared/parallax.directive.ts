import { Directive, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, Renderer2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  @Input() speed = 0.2; // 0..1
  private frame: number | null = null;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLElement>,
    private r2: Renderer2,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.update();
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser) return;
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.update());
  }

  private update() {
    if (!this.isBrowser) return;
    const rect = this.el.nativeElement.getBoundingClientRect?.();
    if (!rect) return;
    const offset = (window.innerHeight - rect.top) * this.speed;
    this.r2.setStyle(this.el.nativeElement, 'transform', `translate3d(0, ${offset}px, 0)`);
    this.r2.setStyle(this.el.nativeElement, 'will-change', 'transform');
  }
}
