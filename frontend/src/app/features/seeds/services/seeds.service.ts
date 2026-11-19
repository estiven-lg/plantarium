import { inject, Injectable } from '@angular/core';
import { SeedsService as OrvalSeedsApi } from '@core/api/endpoints/seeds/seeds.service';
import { CreateSeedDto, SeedResponseDto, UpdateSeedDto } from '@core/api/models';
import { Observable } from 'rxjs';

export type Seed = SeedResponseDto;

@Injectable({ providedIn: 'root' })
export class SeedsService {
  private api = inject(OrvalSeedsApi);

  getAll(): Observable<Seed[]> {
    return this.api.getApiSeeds('application/json');
  }

  getById(id: string): Observable<Seed> {
    return this.api.getApiSeedsId(id, 'application/json');
  }

  update(id: string, seed: UpdateSeedDto): Observable<Seed> {
    return this.api.putApiSeedsId(id, seed, 'application/json');
  }

  create(seed: CreateSeedDto): Observable<Seed> {
    return this.api.postApiSeeds(seed, 'application/json');
  }

  delete(id: string): Observable<void> {
    return this.api.deleteApiSeedsId(id);
  }
}
