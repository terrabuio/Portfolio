import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: {
      title: 'Início — Bernardo Terrabuio Paes de Barros',
      description:
        'Portfólio de Bernardo — Desenvolvedor Full Stack / Mobile / BI. Experiência com Angular, React Native, Firebase, Node.js e BI.'
    }
  },
  {
    path: 'about',
    component: About,
    data: {
      title: 'Sobre — Bernardo Terrabuio Paes de Barros',
      description:
        'Resumo profissional, certificações e tecnologias: Angular, React Native, Firebase, Node.js, PostgreSQL, BI e mais.'
    }
  },
  {
    path: 'portfolio',
    component: Portfolio,
    data: {
      title: 'Projetos — Bernardo Terrabuio Paes de Barros',
      description:
        'Projetos destacados com stacks modernas e foco em performance: logística, 5G, BI, ETL e apps mobile.'
    }
  },
  {
    path: 'contact',
    component: Contact,
    data: {
      title: 'Contato — Bernardo Terrabuio Paes de Barros',
      description: 'Fale comigo por e-mail, LinkedIn ou formulário para novas oportunidades.'
    }
  },
  { path: '**', redirectTo: '' }
];
