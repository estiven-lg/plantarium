import { inject, Injectable } from "@angular/core";
import { FruitsService as OrvalFruitsApi } from "@core/api/endpoints/fruits/fruits.service";
import { FruitResponseDto } from "@core/api/models";
import { Observable } from "rxjs";

export type Fruit = FruitResponseDto;

@Injectable({ providedIn: 'root' })
export class FruitsService {
    private api = inject(OrvalFruitsApi)

    getall(): Observable<Fruit[]> {
        return this.api.getApiFruits()
    }
}
