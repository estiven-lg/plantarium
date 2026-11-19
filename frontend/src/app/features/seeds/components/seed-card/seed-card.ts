import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seed } from '@features/seeds/services/seeds.service';
import { Bean, LucideAngularModule } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule, RouterLink],
  selector: 'app-seed-card',
  styleUrl: './seed-card.css',
  templateUrl: './seed-card.html',
})
export class SeedCard {
  readonly seed = input.required<Seed>();
  readonly seedIcon = Bean;
}
