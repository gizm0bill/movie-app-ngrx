import { Component, input, output } from '@angular/core';
import { Movie } from './movie.model';
import { JsonPipe } from '@angular/common';

@Component( {
  selector: 'movie-list',
  imports: [ JsonPipe ],
  template: `
    <h1>Movie List</h1>
    <section>
    @for ( movie of movies(); track movie.id ) {
      <article>
        <h2>{{movie.title}}</h2>
        <p>{{movie.release_date}}</p>
        @if ( movie.backdrop_path ) {
          <img [src]="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path" alt="{{movie.title}}" />
        }
        <ul>
          @for ( genre of movie.genres; track genre ) {
            <li>{{genre}}</li>
          }
        </ul>
        <button (click)="select.emit(movie)">Select</button>
      </article>
    }
    </section>
  `,
} )
export class MovieListComponent {
  movies = input<Movie[]>([]);
  select = output<Movie>();
}
