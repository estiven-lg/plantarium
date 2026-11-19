import { Routes } from '@angular/router';

export const FRUITS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/fruit-list/fruit-list').then((m) => m.FruitList),
    title: 'Fruits',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/fruit-form/fruit-form').then((m) => m.FruitForm),
    title: 'Edit Fruit',
  },
];
