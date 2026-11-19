import { Routes } from '@angular/router';

export const SEEDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/seed-list/seed-list').then((m) => m.SeedList),
    title: 'Seeds',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/seed-form/seed-form').then((m) => m.SeedForm),
    title: 'Edit Seed',
  },
];
