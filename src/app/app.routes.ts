import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailsComponent } from './movie-details.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('./movie-list.component')).MovieListComponent,
  },
  {
    path: 'movies/:id',
    loadComponent: async () => (await import('./movie-details.component')).MovieDetailsComponent
  }
];
