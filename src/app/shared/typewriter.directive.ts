import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTypewriter]',
  standalone: true,
})
export class TypewriterDirective implements OnInit, OnDestroy {
  @Input() words: string[] = [];
  @Input() typeSpeed = 65; // ms per char
  @Input() pause = 1400; // pause at end of word

  private isBrowser: boolean;
  private idx = 0;
  private char = 0;
  private deleting = false;
  private raf: number | null = null;
  private last = 0;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private el: ElementRef<HTMLElement>) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser || this.words.length === 0) return;
    this.tick(performance.now());
  }

  ngOnDestroy(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  private tick(ts: number) {
    const node = this.el.nativeElement;
    const word = this.words[this.idx % this.words.length];
    const delta = ts - this.last;

    const speed = this.deleting ? this.typeSpeed / 2 : this.typeSpeed;
    if (delta >= speed) {
      this.last = ts;
      this.char += this.deleting ? -1 : 1;
      node.textContent = word.slice(0, Math.max(0, this.char));

      if (!this.deleting && this.char >= word.length) {
        this.deleting = true;
        this.last = ts + this.pause;
      } else if (this.deleting && this.char <= 0) {
        this.deleting = false;
        this.idx++;
      }
    }
    this.raf = requestAnimationFrame((t) => this.tick(t));
  }
}

