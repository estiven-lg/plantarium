import { Component, inject } from '@angular/core';
import { LucideAngularModule, Plus, Sprout, Sun } from 'lucide-angular';
import { ThemeToggle } from '@shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, ThemeToggle],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  readonly SunIcon = Sun;
}
