import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  techs: string[];
  status?: string;
  links?: { github?: string; demo?: string; docs?: string };
  images: string[];
}

@Component({
  selector: 'project-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './project-modal.html'
})
export class ProjectModal {
  @Input() open = false;
  @Input() project?: ProjectDetail;
  @Output() closed = new EventEmitter<void>();

  idx = 0;

  close() {
    this.closed.emit();
  }

  prev() {
    if (!this.project) return;
    this.idx = (this.idx - 1 + this.project.images.length) % this.project.images.length;
  }

  next() {
    if (!this.project) return;
    this.idx = (this.idx + 1) % this.project.images.length;
  }
}
