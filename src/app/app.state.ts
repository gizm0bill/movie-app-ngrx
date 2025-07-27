import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer, MoviesState } from './movie-state/reducer';

export interface AppState {
  movies: MoviesState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer
};
