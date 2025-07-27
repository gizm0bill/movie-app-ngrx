import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadMovieDetails, loadMovieDetailsFailure, loadMovieDetailsSuccess, loadMovies, loadMoviesFailure, loadMoviesSuccess } from "./actions";
import { catchError, map, mergeMap, of, shareReplay, switchMap, zip } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ENV } from "../../environment/provider";
import { Movie } from "../movie.model";

@Injectable()
export class MoviesEffects {
  readonly #actions$ = inject( Actions );
  readonly #http = inject( HttpClient );
  readonly #env = inject( ENV );
  readonly #genresRequest = this.#http.get<{ genres: { id: number; name: string }[] }>(`${this.#env.apiUrl}/genre/movie/list?language=en-US`).pipe(
    shareReplay()
  );
  loadMovies$ = createEffect(() => this.#actions$.pipe(
    ofType(loadMovies),
    mergeMap(() => zip(
      this.#http.get<{ results: Movie[] }>(`${this.#env.apiUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`),
      this.#genresRequest
    ).pipe(
        map(([movies, genres]) => loadMoviesSuccess({
          movies: movies.results.map( movie =>
            ({
              ...movie,
              genres: movie.genre_ids
                .map(genreId => genres.genres.find(genre => genre.id === genreId)?.name)
                .filter((name): name is string => typeof name === 'string'),
            }))
        })),
        catchError(error => of(loadMoviesFailure({ error })))
      )
    )
  ));
  loadMovieDetails$ = createEffect(() => this.#actions$.pipe(
    ofType(loadMovieDetails),
    mergeMap(({ id }) =>
      this.#http.get<{ imdb_id: string }>(`${this.#env.apiUrl}/movie/${id}/external_ids`).pipe(
        switchMap(externalIds => {
          const externalId = externalIds.imdb_id;
          return zip(
            this.#http.get<{ movie_results: Movie[] }>(`${this.#env.apiUrl}/find/${externalId}`, {
              params: {
                external_source: 'imdb_id'
              }
            }),
            this.#genresRequest
          ).pipe(
            map(([movie, genres]) => loadMovieDetailsSuccess({
              movie: {
                ...movie.movie_results[0],
                genres: movie.movie_results[0].genre_ids
                  .map(genreId => genres.genres.find(genre => genre.id === genreId)?.name)
                .filter((name): name is string => typeof name === 'string'),
              }
            })),
          )
        }),
        catchError(error => of(loadMovieDetailsFailure({ error })))
      )
    )
  ));
}
