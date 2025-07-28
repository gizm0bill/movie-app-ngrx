import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { selectMovies } from './movie-state/selectors';
import { Movie } from './movie.model';
import { RouterLink } from '@angular/router';

@Component( {
  selector: 'section.movie-list',
  imports: [ RouterLink ],
  template: `
    @for ( movie of movies(); track movie.id ) {
      <article [routerLink]="['/movies', movie.id]">
        <h2>{{movie.title}}</h2>
        <p>{{movie.release_date}}</p>
        @if ( movie.poster_path ) {
          <img [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="{{movie.title}}" />
        }
        <ul>
          @for ( genre of movie.genres; track genre ) {
            <li>{{genre}}</li>
          }
        </ul>
      </article>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class MovieListComponent {
  readonly #store = inject( Store<AppState> );
  movies = toSignal( this.#store.select(selectMovies) );
}
