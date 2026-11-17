import { Routes } from '@angular/router';

export const FRUITS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/fruit-list/fruit-list').then(m => m.FruitList),
    title: 'Fruits',
  }
];
