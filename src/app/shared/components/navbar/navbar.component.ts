import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'
import { AsyncPipe } from '@angular/common';

import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  routes = routes.map((route) => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular'}`,
  })).filter((route) => route.path !== '**');

  // Observable way
  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    // tap((event) => console.log(event)),
    map((event) => event.url),
    map((url) => routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas'
    )
  );

  // Signal way
  // pageTitle = toSignal(this.router.events.pipe(
  //   filter((event) => event instanceof NavigationEnd),
  //   // tap((event) => console.log(event)),
  //   map((event) => event.url),
  //   map((url) => routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas'
  //   )
  // ))
}
