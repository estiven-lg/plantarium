import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointService } from '@core/services/breakpoint.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule, RouterLink],
  selector: 'app-seed-list-header',
  styleUrl: './seed-list-header.css',
  templateUrl: './seed-list-header.html',
})
export class SeedListHeader {
  readonly plusIcon = Plus;
  private readonly breakpointService = inject(BreakpointService);

  isMobile = this.breakpointService.isMobile;
}
