import {
  animate,
  style,
  transition,
  trigger,
  state,
  query,
  animateChild,
} from '@angular/animations';

export const carousel = trigger('carousel', [
  state(
    'fadeIn',
    style({
      opacity: 1,
      display: 'block',
    })
  ),
  state(
    'fadeOut',
    style({
      opacity: 0,
      transform: 'translateX(0)',
    })
  ),
  state(
    'slideIn',
    style({
      display: 'block',
      transform: 'translateX(0)',
    })
  ),
  state(
    'prevIn',
    style({
      display: 'block',
      transform: 'translateX(-100%)',
    })
  ),
  state(
    'prevOut',
    style({
      display: 'block',
      transform: 'translateX(+100%)',
    })
  ),
  state(
    'nextIn',
    style({
      display: 'block',
      transform: 'translateX(+100%)',
    })
  ),
  state(
    'nextOut',
    style({
      display: 'block',
      transform: 'translateX(-100%)',
    })
  ),

  transition('prevIn => slideIn', [
    animate('600ms cubic-bezier(0, 0, 0.2, 0.1)'),
    query('@*', animateChild(), { optional: true }),
  ]),
  transition('nextIn => slideIn', [
    animate('600ms cubic-bezier(0, 0, 0.2, 0.1)'),
    query('@*', animateChild(), { optional: true }),
  ]),
  transition('slideIn => prevOut', [
    animate('600ms cubic-bezier(0, 0, 0.2, 0.1)'),
  ]),
  transition('slideIn => nextOut', [
    animate('600ms cubic-bezier(0, 0, 0.2, 0.1)'),
  ]),
  transition('fadeIn => fadeOut', [
    animate('1000ms cubic-bezier(0.4, 0.0, 1, 1)'),
  ]),
  transition('fadeOut => fadeIn', [
    animate('600ms cubic-bezier(0, 0, 0.2, 0.1)'),
    query('@*', animateChild(), { optional: true }),
  ]),
]);


import {
  animation,
  useAnimation,
} from '@angular/animations';

const metadata = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})',
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0, 0, 0.2, 0.1)', style('*')),
  ],
  {
    params: {
      duration: '280ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0',
    },
  }
);

export const customAnimation = trigger('custom', [
  transition('* => fadeIn', [useAnimation(metadata)]),
  transition('* => slideIn', [useAnimation(metadata)]),
  transition('void => *', [useAnimation(metadata)]),
]);
