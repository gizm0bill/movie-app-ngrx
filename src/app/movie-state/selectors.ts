import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectMoviesState = (state: AppState) => state.movies;

export const selectMovies = createSelector(
  selectMoviesState,
  state => state?.movies
);

export const selectSelectedMovie = createSelector(
  selectMoviesState,
  state => state?.movies.find(m => m.id === state?.selectedMovieId)
);

export const selectSelectedMovieDetails = createSelector(
  selectMoviesState,
  (state) => state.selectedMovieDetails
);

export const selectMoviesLoading = createSelector(
  selectMoviesState,
  state => state.loading
);

export const selectMoviesError = createSelector(
  selectMoviesState,
  state => state.error
);

