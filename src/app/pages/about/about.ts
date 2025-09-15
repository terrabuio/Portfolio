import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [ScrollRevealDirective, TiltDirective, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
