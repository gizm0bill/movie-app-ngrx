import { createReducer, on } from "@ngrx/store";
import { loadMovies, loadMoviesFailure, loadMoviesSuccess, selectMovie } from "./actions";
import { Movie } from "../movie.model";

export interface MoviesState {
  movies: Movie[];
  selectedMovieId: number | null;
  loading: boolean;
}

export const initialState: MoviesState = {
  movies: [],
  selectedMovieId: null,
  loading: false
};

export const moviesReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({ ...state, loading: true })),
  on(loadMoviesSuccess, (state, { movies }) => ({ ...state, movies, loading: false })),
  on(loadMoviesFailure, (state) => ({ ...state, loading: false })),
  on(selectMovie, (state, { movieId }) => ({ ...state, selectedMovieId: movieId }))
);
