import { trigger, transition, style, query, animateChild, group, animate, state } from '@angular/animations';

export const routeTransitionAnimations =
  trigger('triggerName', [
    transition('Home => About, About => Users, Users => Products, UsersAddEdit => Products, About => Products, Home => Users, Home => Products', slideTo('right')),
	  transition('Products=> Users, Products=> About, Products=>Home, Users => About,  About => Home, Users => Home', slideTo('left')),
	  transition('UsersAddEdit => About, UsersAddEdit => Home', slideTo('left')),
	  transition('ProductsAddEdit => Home,ProductsAddEdit => About,ProductsAddEdit => Users', slideTo('left')),
    transition('UsersAddEdit => Users, ProductsAddEdit => Products, Login<=>*' , slideY('down')),
    transition('*<=>NotFound,*<=>Unauthorized' , slideY('down')),
    transition('Users => UsersAddEdit, Products => ProductsAddEdit', slideY('up'))
]);
export const fadeInOut = trigger('fadeInOut', [
  state(
    'in',
    style({
      opacity: 1,
    })
  ),
  transition('void => *', [style({transform: 'translateY(-100%)' }), animate('200ms ease-out',style({transform: 'translateY(0%)'}))]),
  transition('* => void', [animate('200ms ease-in'), style({ opacity: 0,transform: 'translateY(100%)'})]),
]);

function slideTo(direction:string) {
  const optional = { optional: true };
  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ [direction]: '-100%', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms cubic-bezier(.63,.1,.91,.38)', style({ [direction]: '100%', opacity: 0 }))]),
      query(':enter', [animate('500ms cubic-bezier(.74,-0.2,.16,1.21)', style({ [direction]: '0%', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ];
}
function slideY(direction: string) {
  const optional = { optional: true };
  const multiplier = (direction=='down')? ['-','']:['','-'];
  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ transform: 'translateY('+[multiplier[0]]+'100%)', opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms cubic-bezier(.63,.1,.91,.38)', style({ transform: 'translateY('+[multiplier[1]]+'300%)', opacity: 0 }))]),
      query(':enter', [animate('500ms cubic-bezier(.74,-0.2,.16,1.21)', style({ transform: 'translateY(0%)', opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ];
}
