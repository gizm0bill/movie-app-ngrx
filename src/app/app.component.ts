import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { loadMovies, selectMovie } from './movie-state/actions';
import { selectMovies } from './movie-state/selectors';
import { Movie } from './movie.model';
import { MovieListComponent } from './movie-list.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [ MovieListComponent ],
  template: `
    <h1>Movie App</h1>
    <movie-list [movies]="movies()" (select)="onSelect($event)" />
  `,
  styleUrl: './app.css'
})
export class App {
  readonly #store = inject( Store<AppState> );
  movies = toSignal( this.#store.select(selectMovies) );
  ngOnInit() {
    this.#store.dispatch(loadMovies());
  }

  onSelect(movie: Movie) {
    this.#store.dispatch(selectMovie({ movieId: movie.id }));
  }
}
