import { Component, input } from '@angular/core';
import { FadeInDirective } from './fade-in.directive';

type Align = 'left' | 'center' | 'right';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-hero-text',
  standalone: true,
  imports: [FadeInDirective],
  template: `
    <div [class]="className()">
      <h1
        appFadeIn
        [delay]="200"
        [duration]="700"
        [class]="headingClasses()"
      >
        <ng-content select="[heroTitle]" />
      </h1>
      @if (description()) {
        <p appFadeIn [delay]="400" [duration]="700" [class]="descriptionClasses()">
          {{ description() }}
        </p>
      }
    </div>
  `,
})
export class HeroTextComponent {
  readonly description = input<string>();
  readonly align = input<Align>('left');
  readonly alignLg = input<Align | undefined>(undefined);
  readonly size = input<Size>('md');
  readonly className = input('');

  private readonly headingSize: Record<Size, string> = {
    sm: 'text-[28px] leading-[34px] lg:text-[36px] lg:leading-[42px]',
    md: 'text-[30px] leading-[36px] lg:text-[40px] lg:leading-[48px]',
    lg: 'text-[30px] leading-[36px] sm:text-[40px] md:text-[48px] lg:text-[48px] lg:leading-[62px]',
  };

  private readonly alignment: Record<Align, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  private readonly alignmentLg: Record<Align, string> = {
    left: 'lg:text-left',
    center: 'lg:text-center',
    right: 'lg:text-right',
  };

  headingClasses(): string {
    const lg = this.alignLg();
    return [
      this.headingSize[this.size()],
      'font-extrabold text-[#1b1b1b] tracking-tight',
      this.alignment[this.align()],
      lg ? this.alignmentLg[lg] : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  descriptionClasses(): string {
    const align = this.align();
    const alignLg = this.alignLg();
    return [
      'mt-5 text-[15px] font-semibold leading-7 text-[#6b7280]',
      this.alignment[align],
      align === 'center' ? 'mx-auto' : 'mx-0',
      alignLg === 'center' ? 'lg:mx-auto' : '',
      alignLg === 'left' ? 'lg:text-left' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
