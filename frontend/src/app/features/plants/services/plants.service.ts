import { inject, Injectable } from '@angular/core';
import { PlantsService as OrvalPlantsApi } from '@core/api/endpoints/plants/plants.service';
import { PlantResponseDto } from '@core/api/models';
import { Observable } from 'rxjs';

export type Plant = PlantResponseDto;

@Injectable({ providedIn: 'root' })
export class PlantsService {
  private api = inject(OrvalPlantsApi);

  getAll(): Observable<Plant[]> {
    return this.api.getApiPlants();
  }

  getById(id: string): Observable<Plant> {
    return this.api.getApiPlantsId(id);
  }

  update(id: string, plant: Plant): Observable<Plant> {
    return this.api.putApiPlantsId(id, plant);
  }

  create(plant: Plant): Observable<Plant> {
    return this.api.postApiPlants(plant);
  }

  delete(id: string): Observable<void> {
    return this.api.deleteApiPlantsId(id);
  }
}
