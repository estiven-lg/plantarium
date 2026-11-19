import { Component, OnInit, inject, signal } from '@angular/core';
import { FruitCard } from '@features/fruits/components/fruit-card/fruit-card';
import { FruitListHeader } from '@features/fruits/components/fruit-list-header/fruit-list-header';
import { FruitCardSkeleton } from '@features/fruits/components/fruit-list-skeleton/fruit-card-skeleton';
import { Fruit, FruitsService } from '@features/fruits/services/fruits.service';

@Component({
  selector: 'app-fruit-list',
  imports: [FruitCard, FruitListHeader, FruitCardSkeleton],
  templateUrl: './fruit-list.html',
  styleUrl: './fruit-list.css',
})
export class FruitList implements OnInit {
  // 1. Inyectamos el servicio usando la función moderna inject()
  private readonly fruitsService = inject(FruitsService);

  // 2. Estado reactivo con Signals
  fruits = signal<Fruit[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  // 3. Se ejecuta automáticamente una sola vez cuando el componente se monta en pantalla
  ngOnInit(): void {
    this.loadFruits();
  }

  private loadFruits(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.fruitsService.getAll().subscribe({
      next: (data) => {
        this.fruits.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar frutas:', err);
        this.errorMessage.set('No se pudieron cargar las frutas.');
        this.isLoading.set(false);
      },
    });
  }
}
