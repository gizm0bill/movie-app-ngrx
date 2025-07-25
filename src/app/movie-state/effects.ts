import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadMovies, loadMoviesFailure, loadMoviesSuccess } from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ENV } from "../../environment/provider";

@Injectable()
export class MoviesEffects {
  readonly #actions$ = inject( Actions );
  readonly #http = inject( HttpClient );
  readonly #env = inject( ENV );
  loadMovies$ = createEffect(() => this.#actions$.pipe(
    ofType(loadMovies),
    mergeMap(() => this.#http.get<any /*MovieResponse*/>(`${this.#env.apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc?api_key=${this.#env.apiKey}`)
      .pipe(
        map(response => loadMoviesSuccess({ movies: response.results })),
        catchError(error => of(loadMoviesFailure({ error })))
      )
    )
  ));
}
