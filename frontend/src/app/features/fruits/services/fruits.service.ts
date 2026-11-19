import { inject, Injectable } from '@angular/core';
import { FruitsService as OrvalFruitsApi } from '@core/api/endpoints/fruits/fruits.service';
import { CreateFruitDto, FruitResponseDto, UpdateFruitDto } from '@core/api/models';
import { Observable } from 'rxjs';

export type Fruit = FruitResponseDto;

@Injectable({ providedIn: 'root' })
export class FruitsService {
  private api = inject(OrvalFruitsApi);

  getAll(): Observable<Fruit[]> {
    return this.api.getApiFruits();
  }

  getById(id: string): Observable<Fruit> {
    return this.api.getApiFruitsId(id);
  }

  update(id: string, fruit: UpdateFruitDto): Observable<Fruit> {
    return this.api.putApiFruitsId(id, fruit);
  }

  create(fruit: CreateFruitDto): Observable<Fruit> {
    return this.api.postApiFruits(fruit);
  }

  delete(id: string): Observable<void> {
    return this.api.deleteApiFruitsId(id);
  }
}
