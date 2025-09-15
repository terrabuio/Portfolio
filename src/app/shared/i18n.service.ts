import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Dict = Record<string, string>;

const PT: Dict = {
  'nav.home': 'Início',
  'nav.about': 'Sobre mim',
  'nav.portfolio': 'Portfólio',
  'nav.contact': 'Contato',

  'home.badge': 'Disponível para novos projetos',
  'home.greeting': 'Olá, eu sou',
  'home.role': 'Atuação',
  'home.cta.contact': 'Fale comigo',
  'home.cta.portfolio': 'Ver portfólio',
  'home.paragraph': 'Desenvolvedor Full Stack / Mobile / BI com +4 anos de experiência. Já atuei com INDT, Geoforce Inc. e Revemar Honda, entregando soluções de logística nacional, 5G, dashboards e ETL.',

  'about.title': 'Sobre mim',
  'about.experiences': 'Experiências',
  'about.stack': 'Stack',
  'about.highlights': 'Destaques',
  'about.timeline': 'Experiência',
  'about.exp.1': 'INDT – Projetos de inovação',
  'about.exp.2': 'Geoforce Inc. – Logística e rastreamento',
  'about.exp.3': 'Revemar Honda – Sistemas internos',
  'about.hi.1': 'SUFRAMA • Logística nacional • 5G',
  'about.hi.2': 'Dashboards de BI e automações',
  'about.hi.3': 'ETL com SSIS / Talend / BigQuery',
  'about.hi.4': 'Entregas com foco em performance',
  'about.timeline.indt.tag': 'P&D • 5G',
  'about.timeline.indt.desc': 'Projetos de inovação e conectividade',
  'about.timeline.geo.tag': 'Logística • Rastreamento',
  'about.timeline.geo.desc': 'Plataformas de rastreio e indicadores',
  'about.timeline.paipe.tag': 'Produtos digitais',
  'about.timeline.paipe.desc': 'Soluções full stack com foco em UX',

  'portfolio.title': 'Portfólio',
  'portfolio.subtitle': 'Alguns projetos representativos e stacks utilizadas.',
  'portfolio.github': 'GitHub',
  'portfolio.demo': 'Demo',
  'portfolio.clear': 'Limpar',
  'portfolio.card1.title': 'Rastreamento Logístico',
  'portfolio.card1.desc': 'Plataforma de rastreio nacional com dashboards de indicadores e integrações.',
  'portfolio.card2.title': 'App Mobile 5G',
  'portfolio.card2.desc': 'Aplicativo com recursos de conectividade 5G e telemetria.',
  'portfolio.card3.title': 'BI & ETL',
  'portfolio.card3.desc': 'Dashboards interativos e pipelines de dados com agendamento e monitoramento.',
  'portfolio.status.prod': 'Prod',
  'portfolio.status.pd': 'P&D',
  'portfolio.status.data': 'Data',

  'contact.title': 'Contato',
  'contact.subtitle': 'Vamos conversar sobre seu projeto ou oportunidade.',
  'contact.name': 'Nome',
  'contact.email': 'E-mail',
  'contact.message': 'Mensagem',
  'contact.send': 'Enviar',
  'contact.error.name': 'Informe seu nome.',
  'contact.error.email': 'Informe um e-mail válido.',
  'contact.error.message': 'Escreva uma mensagem.',

  'footer.email': 'Email',
  'footer.home': 'Início',
  'footer.rights': 'Todos os direitos reservados.'
};

const EN: Dict = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.portfolio': 'Portfolio',
  'nav.contact': 'Contact',

  'home.badge': 'Available for new projects',
  'home.greeting': 'Hi, I am',
  'home.role': 'Focus',
  'home.cta.contact': 'Contact me',
  'home.cta.portfolio': 'See portfolio',
  'home.paragraph': 'Full Stack / Mobile / BI developer with 4+ years of experience. Worked with INDT, Geoforce Inc. and Revemar Honda delivering national logistics, 5G, dashboards and ETL solutions.',

  'about.title': 'About Me',
  'about.experiences': 'Experiences',
  'about.stack': 'Stack',
  'about.highlights': 'Highlights',
  'about.timeline': 'Experience',
  'about.exp.1': 'INDT – Innovation projects',
  'about.exp.2': 'Geoforce Inc. – Logistics & tracking',
  'about.exp.3': 'Revemar Honda – Internal systems',
  'about.hi.1': 'SUFRAMA • National logistics • 5G',
  'about.hi.2': 'BI dashboards and automations',
  'about.hi.3': 'ETL with SSIS / Talend / BigQuery',
  'about.hi.4': 'Performance-focused deliveries',
  'about.timeline.indt.tag': 'R&D • 5G',
  'about.timeline.indt.desc': 'Innovation and connectivity projects',
  'about.timeline.geo.tag': 'Logistics • Tracking',
  'about.timeline.geo.desc': 'Tracking platforms and KPIs',
  'about.timeline.paipe.tag': 'Digital products',
  'about.timeline.paipe.desc': 'Full stack solutions with UX focus',

  'portfolio.title': 'Portfolio',
  'portfolio.subtitle': 'Selected projects and tech stacks used.',
  'portfolio.github': 'GitHub',
  'portfolio.demo': 'Demo',
  'portfolio.clear': 'Clear',
  'portfolio.card1.title': 'Logistics Tracking',
  'portfolio.card1.desc': 'National tracking platform with KPI dashboards and integrations.',
  'portfolio.card2.title': '5G Mobile App',
  'portfolio.card2.desc': 'Application with 5G connectivity and telemetry.',
  'portfolio.card3.title': 'BI & ETL',
  'portfolio.card3.desc': 'Interactive dashboards and scheduled data pipelines.',
  'portfolio.status.prod': 'Prod',
  'portfolio.status.pd': 'R&D',
  'portfolio.status.data': 'Data',

  'contact.title': 'Contact',
  'contact.subtitle': 'Let’s talk about your project or opportunity.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.send': 'Send',
  'contact.error.name': 'Please enter your name.',
  'contact.error.email': 'Please enter a valid email.',
  'contact.error.message': 'Please write a message.',

  'footer.email': 'Email',
  'footer.home': 'Home',
  'footer.rights': 'All rights reserved.'
};

const ES: Dict = {
  'nav.home': 'Inicio',
  'nav.about': 'Sobre mí',
  'nav.portfolio': 'Portafolio',
  'nav.contact': 'Contacto',

  'home.badge': 'Disponible para nuevos proyectos',
  'home.greeting': 'Hola, soy',
  'home.role': 'Actuación',
  'home.cta.contact': 'Hable conmigo',
  'home.cta.portfolio': 'Ver portafolio',
  'home.paragraph': 'Desarrollador Full Stack / Mobile / BI con más de 4 años de experiencia. Actué con INDT, Geoforce Inc. y Revemar Honda, entregando soluciones de logística nacional, 5G, paneles y ETL.',

  'about.title': 'Sobre mí',
  'about.experiences': 'Experiencias',
  'about.stack': 'Stack',
  'about.highlights': 'Destacados',
  'about.timeline': 'Experiencia',
  'about.exp.1': 'INDT – Proyectos de innovación',
  'about.exp.2': 'Geoforce Inc. – Logística y rastreo',
  'about.exp.3': 'Revemar Honda – Sistemas internos',
  'about.hi.1': 'SUFRAMA • Logística nacional • 5G',
  'about.hi.2': 'Paneles de BI y automatizaciones',
  'about.hi.3': 'ETL con SSIS / Talend / BigQuery',
  'about.hi.4': 'Entregas con foco en rendimiento',
  'about.timeline.indt.tag': 'I+D • 5G',
  'about.timeline.indt.desc': 'Proyectos de innovación y conectividad',
  'about.timeline.geo.tag': 'Logística • Rastreo',
  'about.timeline.geo.desc': 'Plataformas de rastreo e indicadores',
  'about.timeline.paipe.tag': 'Productos digitales',
  'about.timeline.paipe.desc': 'Soluciones full stack con enfoque UX',

  'portfolio.title': 'Portafolio',
  'portfolio.subtitle': 'Proyectos representativos y stacks utilizados.',
  'portfolio.github': 'GitHub',
  'portfolio.demo': 'Demo',
  'portfolio.clear': 'Limpiar',
  'portfolio.card1.title': 'Rastreo Logístico',
  'portfolio.card1.desc': 'Plataforma de rastreo nacional con paneles e integraciones.',
  'portfolio.card2.title': 'App Móvil 5G',
  'portfolio.card2.desc': 'Aplicación con conectividad 5G y telemetría.',
  'portfolio.card3.title': 'BI y ETL',
  'portfolio.card3.desc': 'Paneles interactivos y pipelines de datos programados.',
  'portfolio.status.prod': 'Prod',
  'portfolio.status.pd': 'I+D',
  'portfolio.status.data': 'Datos',

  'contact.title': 'Contacto',
  'contact.subtitle': 'Hablemos de su proyecto u oportunidad.',
  'contact.name': 'Nombre',
  'contact.email': 'Correo',
  'contact.message': 'Mensaje',
  'contact.send': 'Enviar',
  'contact.error.name': 'Informe su nombre.',
  'contact.error.email': 'Informe un correo válido.',
  'contact.error.message': 'Escriba un mensaje.',

  'footer.email': 'Correo',
  'footer.home': 'Inicio',
  'footer.rights': 'Todos los derechos reservados.'
};

const DICTS: Record<string, Dict> = { pt: PT, en: EN, es: ES };

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<'pt' | 'en' | 'es'>('pt');
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  init() {
    const saved = this.isBrowser ? localStorage.getItem('lang') : null;
    if (saved === 'pt' || saved === 'en' || saved === 'es') {
      this.lang.set(saved);
      return;
    }
    if (this.isBrowser) {
      const nav = navigator.language.toLowerCase();
      if (nav.startsWith('pt')) this.lang.set('pt');
      else if (nav.startsWith('es')) this.lang.set('es');
      else this.lang.set('en');
    } else {
      this.lang.set('pt');
    }
  }

  t(key: string): string {
    const dict = DICTS[this.lang()];
    return dict[key] ?? key;
  }

  typewriterWords(): string[] {
    switch (this.lang()) {
      case 'en':
        return ['Full Stack', 'Mobile', 'Business Intelligence'];
      case 'es':
        return ['Full Stack', 'Móvil', 'Business Intelligence'];
      default:
        return ['Full Stack', 'Mobile', 'BI'];
    }
  }

  setLang(l: 'pt' | 'en' | 'es') {
    this.lang.set(l);
    if (this.isBrowser) localStorage.setItem('lang', l);
  }
}
