import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadMovies, selectMovie } from './movie-state/actions';
import { selectMovies } from './movie-state/selectors';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Movie } from './movie.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly #store = inject( Store<AppState> );
  movies = this.#store.select(selectMovies);
  ngOnInit() {
    this.#store.dispatch(loadMovies());
  }

  onSelect(movie: Movie) {
    this.#store.dispatch(selectMovie({ movieId: movie.id }));
  }
}
