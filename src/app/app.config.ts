import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { moviesReducer } from './movie-state/reducer';
import { MoviesEffects } from './movie-state/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tmdbAuthInterceptor } from './api.interceptor';
import { reducers } from './app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient( withFetch(), withInterceptors([tmdbAuthInterceptor]) ),
    provideStore( reducers ),
    provideEffects(MoviesEffects),
    provideState({ name: 'movies', reducer: moviesReducer })
]
};
