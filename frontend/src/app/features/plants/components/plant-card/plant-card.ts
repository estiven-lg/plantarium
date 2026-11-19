import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Plant } from '@features/plants/services/plants.service';
import { LucideAngularModule, Sprout } from 'lucide-angular';


@Component({
  imports: [LucideAngularModule, RouterLink],
  selector: 'app-plant-card',
  styleUrl: './plant-card.css',
  templateUrl: './plant-card.html',
})
export class PlantCard {
  readonly plant = input.required<Plant>();
  readonly plantsIcon = Sprout;

}
