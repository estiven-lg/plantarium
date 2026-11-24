import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointService } from '@core/services/breakpoint.service';
import { Citrus, Sun } from 'lucide-angular';
import { Bean, ChevronRight, LucideAngularModule, Sprout } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly SunIcon = Sun;
  readonly fruitsIcon = Citrus;
  readonly seedsIcon = Bean;
  readonly plantsIcon = Sprout;
  readonly toggleIcon = ChevronRight;
  private breakpointService = inject(BreakpointService);

  isMobile = this.breakpointService.isMobile;
  isCollapsed =  signal(this.isMobile());

  toggleSidebar() {
    this.isCollapsed.update(value => !value);
  }

}
