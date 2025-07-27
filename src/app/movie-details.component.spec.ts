import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { MovieDetailsComponent } from './movie-details.component';
import { loadMovieDetails, selectMovie } from './movie-state/actions';
import { selectSelectedMovieDetails } from './movie-state/selectors';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let paramsSubject: Subject<any>;

  const mockMovie = {
    title: 'Test Movie',
    release_date: '2023-01-01',
    poster_path: '/poster.jpg',
    backdrop_path: '/backdrop.jpg',
    overview: 'A test movie.',
    genres: ['Action', 'Comedy']
  };

  beforeEach(async () => {
    paramsSubject = new Subject();
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideMockStore({
          selectors: [
            {
              selector: selectSelectedMovieDetails,
              value: mockMovie
            }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject.asObservable()
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch selectMovie and loadMovieDetails actions on route param change', () => {
    paramsSubject.next({ id: '42' });
    expect(dispatchSpy).toHaveBeenCalledWith(selectMovie({ movieId: 42 }));
    expect(dispatchSpy).toHaveBeenCalledWith(loadMovieDetails({ id: 42 }));
  });

  it('should render movie details in the template', () => {
    paramsSubject.next({ id: '1' });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Movie');
    expect(compiled.querySelector('p')?.textContent).toContain('2023-01-01');
    expect(compiled.querySelector('img')?.getAttribute('src')).toContain('/poster.jpg');
    expect(compiled.querySelector('article')?.style.backgroundImage).toContain('/backdrop.jpg');
    expect(compiled.querySelector('ul')?.textContent).toContain('Action');
    expect(compiled.querySelector('ul')?.textContent).toContain('Comedy');
  });
});
