import { Directive, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() tiltMax = 8; // deg
  @Input() tiltScale = 1.02;

  private isBrowser: boolean;
  private frame: number | null = null;
  private currentX = 0;
  private currentY = 0;
  private rect?: DOMRect;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private el: ElementRef<HTMLElement>,
    private r2: Renderer2,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.rect = this.el.nativeElement.getBoundingClientRect();
    this.r2.setStyle(this.el.nativeElement, 'transformStyle', 'preserve-3d');
    this.r2.setStyle(this.el.nativeElement, 'transition', 'transform 150ms ease');
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isBrowser) return;
    if (!this.rect) this.rect = this.el.nativeElement.getBoundingClientRect();
    const { left, top, width, height } = this.rect!;
    const px = (e.clientX - left) / width - 0.5;
    const py = (e.clientY - top) / height - 0.5;
    this.currentX = Math.min(this.tiltMax, Math.max(-this.tiltMax, px * this.tiltMax * 2));
    this.currentY = Math.min(this.tiltMax, Math.max(-this.tiltMax, py * this.tiltMax * 2));
    this.schedule();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.isBrowser) return;
    this.currentX = 0;
    this.currentY = 0;
    this.schedule();
  }

  private schedule() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.apply());
  }

  private apply() {
    const transform = `perspective(900px) rotateY(${this.currentX}deg) rotateX(${-this.currentY}deg) scale(${this.tiltScale})`;
    this.r2.setStyle(this.el.nativeElement, 'transform', transform);
  }
}

