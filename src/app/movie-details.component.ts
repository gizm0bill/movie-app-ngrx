import { Component, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { loadMovieDetails, selectMovie } from './movie-state/actions';
import { selectSelectedMovieDetails } from './movie-state/selectors';

@Component( {
  selector: 'section.movie-details',
  template: `
    @if ( movie() ) {
      <article [style.backgroundImage]="movie()?.backdrop_path ? 'url(https://image.tmdb.org/t/p/w500' + movie()?.backdrop_path + ')' : ''">
        <h2>{{movie()?.title}}</h2>
        <p>{{movie()?.release_date}}</p>
        @if ( movie()?.poster_path ) {
          <img [src]="'https://image.tmdb.org/t/p/w500' + movie()?.poster_path" alt="{{movie()?.title}}" />
        }
        <p>{{movie()?.overview}}</p>
        <ul>
          @for ( genre of movie()?.genres; track genre ) {
            <li>{{genre}}</li>
          }
        </ul>
      </article>
    }
    `
} )
export class MovieDetailsComponent implements OnDestroy {
  readonly #store = inject( Store<AppState> );
  readonly #route = inject( ActivatedRoute );
  readonly #sub = this.#route.params.subscribe( params => {
    const movieId = +params['id'];
    this.#store.dispatch(selectMovie({ movieId }));
    this.#store.dispatch(loadMovieDetails({ id: movieId }));
  });
  movie = toSignal( this.#store.select(selectSelectedMovieDetails) );
  ngOnDestroy() {
    this.#sub.unsubscribe();
  }
}
