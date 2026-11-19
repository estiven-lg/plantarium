import { Routes } from '@angular/router';

export const PLANTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/plant-list/plant-list').then(m => m.PlantList),
    title: 'Plants',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/plant-form/plant-form').then(m => m.PlantForm),
    title: 'Edit Plant',
  }
];
