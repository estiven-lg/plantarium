import { Component, OnInit, inject, signal } from '@angular/core';
import { SeedCard } from '@features/seeds/components/seed-card/seed-card';
import { SeedListHeader } from '@features/seeds/components/seed-list-header/seed-list-header';
import { SeedCardSkeleton } from '@features/seeds/components/seed-list-skeleton/seed-card-skeleton';
import { Seed, SeedsService } from '@features/seeds/services/seeds.service';

@Component({
  selector: 'app-seed-list',
  imports: [SeedCard, SeedListHeader, SeedCardSkeleton],
  templateUrl: './seed-list.html',
  styleUrl: './seed-list.css',
})
export class SeedList implements OnInit {
  // 1. Inyectamos el servicio usando la función moderna inject()
  private readonly seedsService = inject(SeedsService);

  // 2. Estado reactivo con Signals
  seeds = signal<Seed[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  // 3. Se ejecuta automáticamente una sola vez cuando el componente se monta en pantalla
  ngOnInit(): void {
    this.loadSeeds();
  }

  private loadSeeds(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.seedsService.getAll().subscribe({
      next: (data) => {
        this.seeds.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar semillas:', err);
        this.errorMessage.set('No se pudieron cargar las semillas.');
        this.isLoading.set(false);
      },
    });
  }
}
