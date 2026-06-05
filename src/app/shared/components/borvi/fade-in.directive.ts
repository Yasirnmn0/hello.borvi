import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
} from '@angular/core';
import {
  AnimationBuilder,
  AnimationPlayer,
  animate,
  style,
} from '@angular/animations';

@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly builder = inject(AnimationBuilder);

  readonly delay = input(0);
  readonly duration = input(600);
  readonly y = input(30);
  readonly once = input(true);

  private player?: AnimationPlayer;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const factory = this.builder.build([
      style({ opacity: 0, transform: `translateY(${this.y()}px)` }),
      animate(
        `${this.duration()}ms ${this.delay()}ms ease-out`,
        style({ opacity: 1, transform: 'translateY(0)' }),
      ),
    ]);

    this.player = factory.create(this.el.nativeElement);
    this.player.init();
    this.player.pause();

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.player?.play();
          if (this.once()) {
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.player?.destroy();
  }
}
