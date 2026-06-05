import { Component, input } from '@angular/core';
import { FadeInDirective } from './fade-in.directive';

type Align = 'left' | 'center';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [FadeInDirective],
  template: `
    <div
      appFadeIn
      [class]="align() === 'center' ? 'text-center mx-auto' : 'text-left'"
    >
      <h2 [class]="headingClasses()">
        <ng-content />
      </h2>
      @if (subtitle()) {
        <p class="mt-3 text-[16px] lg:text-[17px] text-slate-500">
          {{ subtitle() }}
        </p>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly subtitle = input<string>();
  readonly align = input<Align>('center');
  readonly size = input<Size>('md');

  private readonly headingSize: Record<Size, string> = {
    sm: 'text-[28px] lg:text-[32px]',
    md: 'text-[36px] lg:text-[40px]',
    lg: 'text-[42px] lg:text-[48px]',
  };

  headingClasses(): string {
    return `${this.headingSize[this.size()]} font-extrabold tracking-[-1px] text-[#111827]`;
  }
}
