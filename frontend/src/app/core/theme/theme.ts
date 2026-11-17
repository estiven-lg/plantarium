import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  // Signal que guarda el estado actual del tema
  isDark = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Revisar si el usuario ya había guardado una preferencia o si su sistema operativo usa modo oscuro
      const savedTheme = localStorage.getItem('plantarium-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.isDark.set(savedTheme ? savedTheme === 'dark' : prefersDark);

      // 2. Effect: cada vez que cambie `isDark()`, actualiza la clase en <html> y guarda en localStorage
      effect(() => {
        const dark = this.isDark();
        const htmlElement = document.documentElement;
        
        if (dark) {
          htmlElement.classList.add('dark');
          localStorage.setItem('plantarium-theme', 'dark');
        } else {
          htmlElement.classList.remove('dark');
          localStorage.setItem('plantarium-theme', 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    this.isDark.update(current => !current);
  }
}