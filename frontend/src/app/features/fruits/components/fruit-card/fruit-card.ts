import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fruit } from '@features/fruits/services/fruits.service';
import { Citrus, LucideAngularModule } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule, RouterLink],
  selector: 'app-fruit-card',
  styleUrl: './fruit-card.css',
  templateUrl: './fruit-card.html',
})
export class FruitCard {
  readonly fruit = input.required<Fruit>();
  readonly fruitIcon = Citrus;
}
