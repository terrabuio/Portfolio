import { Directive, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCursorParallax]',
  standalone: true,
})
export class CursorParallaxDirective implements OnInit, OnDestroy {
  @Input() cpStrengthX = 8; // px max
  @Input() cpStrengthY = 8; // px max

  private isBrowser: boolean;
  private frame: number | null = null;
  private tx = 0;
  private ty = 0;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private el: ElementRef<HTMLElement>,
    private r2: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.r2.setStyle(this.el.nativeElement, 'transition', 'transform 150ms ease');
    this.r2.setStyle(this.el.nativeElement, 'will-change', 'transform');
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  @HostListener('mousemove', ['$event'])
  onMove(e: MouseEvent) {
    if (!this.isBrowser) return;
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.tx = -x * this.cpStrengthX;
    this.ty = -y * this.cpStrengthY;
    this.schedule();
  }

  @HostListener('mouseleave')
  onLeave() {
    if (!this.isBrowser) return;
    this.tx = 0;
    this.ty = 0;
    this.schedule();
  }

  private schedule() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.apply());
  }

  private apply() {
    this.r2.setStyle(
      this.el.nativeElement,
      'transform',
      `translate3d(${this.tx}px, ${this.ty}px, 0)`
    );
  }
}

