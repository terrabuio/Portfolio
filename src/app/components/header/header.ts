import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../shared/translate.pipe';
import { ThemeService } from '../../shared/theme.service';
import { I18nService } from '../../shared/i18n.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  openLang = signal(false);
  constructor(public theme: ThemeService, public i18n: I18nService) {}

  onLangChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (!target) return;
    const val = target.value as 'pt' | 'en' | 'es';
    this.i18n.setLang(val);
  }

  toggleLang() { this.openLang.set(!this.openLang()); }
  choose(l: 'pt'|'en'|'es') { this.i18n.setLang(l); this.openLang.set(false); }
  flag(l: 'pt'|'en'|'es') { return l === 'pt' ? '🇧🇷' : l === 'en' ? '🇺🇸' : '🇪🇸'; }
  code(l: 'pt'|'en'|'es') { return l.toUpperCase(); }
}
