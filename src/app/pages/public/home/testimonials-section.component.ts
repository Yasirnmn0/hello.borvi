import { Component, HostListener, signal } from '@angular/core';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideStar,
} from '@lucide/angular';
import { ContainerComponent } from '../../../shared/components/borvi/container.component';
import { FadeInDirective } from '../../../shared/components/borvi/fade-in.directive';
import { SectionHeadingComponent } from '../../../shared/components/borvi/section-heading.component';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [
    ContainerComponent,
    SectionHeadingComponent,
    FadeInDirective,
    LucideChevronLeft,
    LucideChevronRight,
    LucideStar,
    TranslatePipe,
  ],
  templateUrl: './testimonials-section.component.html',
})
export class TestimonialsSectionComponent {
  readonly testimonials = [
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
  ];

  readonly startIndex = signal(0);
  readonly visibleCount = signal(3);

  @HostListener('window:resize')
  onResize(): void {
    this.visibleCount.set(window.innerWidth < 768 ? 1 : 3);
  }

  constructor() {
    this.onResize();
  }

  visibleTestimonials() {
    const count = this.visibleCount();
    const start = this.startIndex();
    return this.testimonials.slice(start, start + count);
  }

  nextSlide(): void {
    const count = this.visibleCount();
    this.startIndex.update((prev) =>
      prev + count >= this.testimonials.length ? 0 : prev + 1,
    );
  }

  prevSlide(): void {
    const count = this.visibleCount();
    this.startIndex.update((prev) =>
      prev === 0 ? Math.max(0, this.testimonials.length - count) : prev - 1,
    );
  }
}
