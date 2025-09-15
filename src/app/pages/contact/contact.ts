import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/translate.pipe';
import { NgIf } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf, ScrollRevealDirective, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  name = '';
  email = '';
  message = '';

  sendMail() {
    const subject = encodeURIComponent(`Contato pelo portfólio – ${this.name || 'Sem nome'}`);
    const body = encodeURIComponent(`${this.message}\n\n— ${this.name} (${this.email})`);
    window.location.href = `mailto:bernardobarros8@gmail.com?subject=${subject}&body=${body}`;
  }
}
