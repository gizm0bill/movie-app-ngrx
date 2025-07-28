import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { loadMovies } from './movie-state/actions';
import { selectMoviesError, selectMoviesLoading } from './movie-state/selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <h1 [routerLink]="['/']">Movie App</h1>
      @if (loading()) {
        <div class="spinner"></div>
      }
    </header>
    <main>
      @if (errored()) {
        <p>Error loading movies please refresh...</p>
      }
      <router-outlet />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly #store = inject( Store<AppState> );
  loading = toSignal(this.#store.select( selectMoviesLoading ));
  errored = toSignal(this.#store.select( selectMoviesError ));
  ngOnInit() {
    this.#store.dispatch(loadMovies());
  }
}
