import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreakpointService } from '@core/services/breakpoint.service';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule, RouterLink],
  selector: 'app-plant-list-header',
  styleUrl: './plant-list-header.css',
  templateUrl: './plant-list-header.html',
})
export class PlantListHeader {

  private readonly plusIcon = Plus;
  private readonly breakpointService = inject(BreakpointService);

  isMobile = this.breakpointService.isMobile;
}
