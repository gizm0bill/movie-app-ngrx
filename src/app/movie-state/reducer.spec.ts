import { moviesReducer, initialState, MoviesState } from './reducer';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure, selectMovie } from './actions';
import { Movie } from '../movie.model';

describe('movie-state/reducer', () => {
  const mockMovies: Movie[] = [
    {
      id: 1, title: 'Movie 1', overview: 'Desc 1',
      release_date: new Date(),
      genre_ids: [],
      vote_average: 0
    },
    {
      id: 2, title: 'Movie 2', overview: 'Desc 2',
      release_date: new Date(),
      genre_ids: [],
      vote_average: 0
    }
  ];

  it('should return the initial state', () => {
    const state = moviesReducer(undefined, { type: '@@init' } as any);
    expect(state).toEqual(initialState);
  });

  it('should set loading to true on loadMovies', () => {
    const state = moviesReducer(initialState, loadMovies());
    expect(state.loading).toBe(true);
    expect(state.movies).toEqual([]);
    expect(state.selectedMovieId).toBeNull();
  });

  it('should set movies and loading to false on loadMoviesSuccess', () => {
    const prevState: MoviesState = { ...initialState, loading: true };
    const state = moviesReducer(prevState, loadMoviesSuccess({ movies: mockMovies }));
    expect(state.movies).toEqual(mockMovies);
    expect(state.loading).toBe(false);
  });

  it('should set loading to false on loadMoviesFailure', () => {
    const prevState: MoviesState = { ...initialState, loading: true };
    const state = moviesReducer(prevState, loadMoviesFailure({
      error: undefined
    }));
    expect(state.loading).toBe(false);
  });

  it('should set selectedMovieId on selectMovie', () => {
    const state = moviesReducer(initialState, selectMovie({ movieId: 2 }));
    expect(state.selectedMovieId).toBe(2);
  });
});
