import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '../../shared/translate.pipe';
import { I18nService } from '../../shared/i18n.service';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { ProjectModal, ProjectDetail } from '../../components/project-modal/project-modal';

@Component({
  selector: 'app-portfolio',
  imports: [NgClass, ScrollRevealDirective, TiltDirective, ProjectModal, TranslatePipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  filters = signal<string[]>([]);
  selected = signal<ProjectDetail | null>(null);
  constructor(public i18n: I18nService) {}

  projects = signal<ProjectDetail[]>([
    {
      id: 'logistica',
      title: 'Rastreamento Logístico',
      description: 'Plataforma de rastreio nacional com dashboards e integrações.',
      techs: ['Angular', 'Node.js', 'PostgreSQL', 'Docker'],
      status: 'Prod',
      links: { github: '#', demo: '#' },
      images: ['projects/log1.svg', 'projects/log2.svg', 'projects/log3.svg']
    },
    {
      id: 'mobile-5g',
      title: 'App Mobile 5G',
      description: 'Aplicativo com conectividade 5G e telemetria.',
      techs: ['React Native', 'Firebase', 'TypeScript'],
      status: 'P&D',
      links: { github: '#', demo: '#' },
      images: ['projects/5g1.svg', 'projects/5g2.svg']
    },
    {
      id: 'bi-etl',
      title: 'BI & ETL',
      description: 'Dashboards interativos e pipelines de dados escaláveis.',
      techs: ['Power BI', 'Tableau', 'SSIS', 'Talend', 'BigQuery'],
      status: 'Data',
      links: { docs: '#', demo: '#' },
      images: ['projects/bi1.svg', 'projects/bi2.svg']
    }
  ]);

  allTags = computed(() => Array.from(new Set(this.projects().flatMap(p => p.techs))).sort());
  filtered = computed(() => {
    const active = this.filters();
    if (active.length === 0) return this.projects();
    return this.projects().filter(p => active.every(t => p.techs.includes(t)));
  });

  toggleFilter(tag: string) {
    const set = new Set(this.filters());
    if (set.has(tag)) set.delete(tag); else set.add(tag);
    this.filters.set(Array.from(set));
  }

  open(project: ProjectDetail) { this.selected.set(project); }
  closeModal() { this.selected.set(null); }

  openCard(id: 'logistica'|'mobile-5g'|'bi-etl') {
    const t = (k: string) => this.i18n.t(k);
    if (id === 'logistica') {
      this.open({
        id,
        title: t('portfolio.card1.title'),
        description: t('portfolio.card1.desc'),
        techs: ['Angular','Node.js','PostgreSQL','Docker'],
        status: t('portfolio.status.prod'),
        links: { github: 'https://github.com/Berntpb03' },
        images: ['projects/log1.svg','projects/log2.svg','projects/log3.svg']
      });
    } else if (id === 'mobile-5g') {
      this.open({
        id,
        title: t('portfolio.card2.title'),
        description: t('portfolio.card2.desc'),
        techs: ['React Native','Firebase','TypeScript'],
        status: t('portfolio.status.pd'),
        links: { github: 'https://github.com/Berntpb03' },
        images: ['projects/5g1.svg','projects/5g2.svg']
      });
    } else {
      this.open({
        id,
        title: t('portfolio.card3.title'),
        description: t('portfolio.card3.desc'),
        techs: ['Power BI','Tableau','SSIS','Talend','BigQuery'],
        status: t('portfolio.status.data'),
        links: { github: 'https://github.com/Berntpb03' },
        images: ['projects/bi1.svg','projects/bi2.svg']
      });
    }
  }
}
