import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        // default route for fruits
        path: '',
        redirectTo: 'fruits',
        pathMatch: 'full'
    },
    {
        path: 'fruits',
        loadChildren: () =>
            import('./features/fruits/fruits.routes').then(m => m.FRUITS_ROUTES)
    },
    {
        path: 'plants',
        loadChildren: () =>
            import('./features/plants/plants.routes').then(m => m.PLANTS_ROUTES)
    },
    {
        path: 'seeds',
        loadChildren: () =>
            import('./features/seeds/seeds.routes').then(m => m.SEEDS_ROUTES)
    },
    {
        path: '**',
        redirectTo: 'fruits'
    }
];
