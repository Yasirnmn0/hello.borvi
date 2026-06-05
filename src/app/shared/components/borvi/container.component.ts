import { Component, input } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  template: `
    <div [class]="'mx-auto w-full max-w-[1400px] px-6 ' + (className() ?? '')">
      <ng-content />
    </div>
  `,
})
export class ContainerComponent {
  readonly className = input<string>();
}
