import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { TypewriterDirective } from '../../shared/typewriter.directive';
import { CursorParallaxDirective } from '../../shared/cursor-parallax.directive';
import { TranslatePipe } from '../../shared/translate.pipe';
import { I18nService } from '../../shared/i18n.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ScrollRevealDirective, ParallaxDirective, TypewriterDirective, CursorParallaxDirective, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(public i18n: I18nService) {}
}
