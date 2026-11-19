import { Component, OnInit, inject, signal } from '@angular/core';
import { PlantCard } from '@features/plants/components/plant-card/plant-card';
import { PlantListHeader } from '@features/plants/components/plant-list-header/plant-list-header';
import { PlantCardSkeleton } from '@features/plants/components/plant-list-skeleton/plant-card-skeleton';
import { Plant, PlantsService } from '@features/plants/services/plants.service';

@Component({
  selector: 'app-plant-list',
  imports: [PlantCard, PlantListHeader, PlantCardSkeleton],
  templateUrl: './plant-list.html',
  styleUrl: './plant-list.css',
})
export class PlantList implements OnInit {
  // 1. Inyectamos el servicio usando la función moderna inject()
  private readonly plantsService = inject(PlantsService);

  // 2. Estado reactivo con Signals
  plants = signal<Plant[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  // 3. Se ejecuta automáticamente una sola vez cuando el componente se monta en pantalla
  ngOnInit(): void {
    this.loadPlants();
  }

  private loadPlants(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.plantsService.getAll().subscribe({
      next: (data) => {
        this.plants.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar plantas:', err);
        this.errorMessage.set('No se pudieron cargar las plantas.');
        this.isLoading.set(false);
      },
    });
  }

}