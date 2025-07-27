import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MovieListComponent } from './movie-list.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('MovieListComponent', () => {
	let component: MovieListComponent;
	let store: MockStore;

	beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
				provideMockStore({ initialState: { movies: [] } }),
        provideExperimentalZonelessChangeDetection()
      ]
    }).compileComponents();
		store = TestBed.inject(MockStore);
		component = TestBed.createComponent(MovieListComponent).componentInstance;
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a default movie list', () => {
		expect(component.movies()).toEqual([]);
	});
});
