import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  template: `
    @if (fill()) {
      <img
        [src]="src()"
        [alt]="alt()"
        [class]="'absolute inset-0 h-full w-full ' + className()"
        [attr.loading]="priority() ? 'eager' : 'lazy'"
      />
    } @else {
      <img
        [src]="src()"
        [alt]="alt()"
        [attr.width]="width()"
        [attr.height]="height()"
        [class]="className()"
        [attr.loading]="priority() ? 'eager' : 'lazy'"
      />
    }
  `,
})
export class AppImageComponent {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly width = input<number>();
  readonly height = input<number>();
  readonly fill = input(false);
  readonly priority = input(false);
  readonly className = input('');
}
