import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private platformId = inject(PLATFORM_ID);
  readonly isMobile = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const mediaQuery = window.matchMedia('(max-width: 767px)');

      this.isMobile.set(mediaQuery.matches);

      mediaQuery.addEventListener('change', (event) => {
        this.isMobile.set(event.matches);
      });
    }
  }
}
