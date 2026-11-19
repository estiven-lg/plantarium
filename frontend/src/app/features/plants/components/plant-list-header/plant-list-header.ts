import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  selector: 'app-plant-list-header',
  styleUrl: './plant-list-header.css',
  templateUrl: './plant-list-header.html',
})
export class PlantListHeader {

  private readonly plusIcon = Plus;
}
