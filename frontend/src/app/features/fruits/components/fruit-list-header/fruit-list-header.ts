import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule, RouterLink],
  selector: 'app-fruit-list-header',
  styleUrl: './fruit-list-header.css',
  templateUrl: './fruit-list-header.html',
})
export class FruitListHeader {
  readonly plusIcon = Plus;
}
