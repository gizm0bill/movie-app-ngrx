import { createReducer, on } from "@ngrx/store";
import { loadMovieDetails, loadMovieDetailsFailure, loadMovieDetailsSuccess, loadMovies, loadMoviesFailure, loadMoviesSuccess, selectMovie } from "./actions";
import { Movie } from "../movie.model";

export interface MoviesState {
  movies: Movie[];
  selectedMovieId: number | null;
  selectedMovieDetails?: Movie | null;
  loading: boolean;
  error?: any;
}

export const initialState: MoviesState = {
  movies: [],
  selectedMovieId: null,
  selectedMovieDetails: null,
  loading: false
};

export const moviesReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({ ...state, loading: true })),
  on(loadMoviesSuccess, (state, { movies }) => ({ ...state, movies, loading: false })),
  on(loadMoviesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(selectMovie, (state, { movieId }) => ({ ...state, selectedMovieId: movieId, selectedMovieDetails: null })),
  on(loadMovieDetailsSuccess, (state, { movie }) => ({ ...state, selectedMovieDetails: movie, loading: false })),
  on(loadMovieDetails, (state) => ({ ...state, loading: true })),
  on(loadMovieDetailsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
