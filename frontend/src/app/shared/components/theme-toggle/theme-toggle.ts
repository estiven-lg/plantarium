import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme/theme';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass, LucideAngularModule],
  selector: 'app-theme-toggle',
  styleUrl: './theme-toggle.css',
  templateUrl: './theme-toggle.html',
})
export class ThemeToggle {
  themeService = inject(ThemeService);

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
}
