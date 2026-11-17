import { Component } from '@angular/core';
import { Citrus } from 'lucide-angular';
import { Bean, LucideAngularModule, Sprout } from 'lucide-angular/src/icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly fruitsIcon = Citrus;
  readonly seedsIcon = Bean;
  readonly plantsIcon = Sprout;

}
