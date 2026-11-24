import { Component, inject } from '@angular/core';
import { BreakpointService } from '@core/services/breakpoint.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
   private breakpointService = inject(BreakpointService);

   isMobile = this.breakpointService.isMobile;
}
