import { createAction, props } from "@ngrx/store";
import { Movie } from "../movie.model";

export const loadMovies = createAction('[Movies] Load Movies');
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success', props<{ movies: Movie[] }>());
export const loadMoviesFailure = createAction('[Movies] Load Movies Failure', props<{ error: any }>());
export const selectMovie = createAction('[Movies] Select Movie', props<{ movieId: number }>());
export const loadMovieDetails = createAction('[Movies] Load Movie Details', props<{ id: number }>());
export const loadMovieDetailsSuccess = createAction('[Movies] Load Movie Details Success', props<{ movie: Movie }>());
export const loadMovieDetailsFailure = createAction('[Movies] Load Movie Details Failure', props<{ error: any }>());
