import { TestBed, async, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NewsApiService } from './services/news-api.service';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';

describe('AppComponent', () => {
  let component: AppComponent;
  let newsApiService: NewsApiService;

  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [NewsApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    newsApiService = TestBed.inject(NewsApiService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'assignment-hacker-news'`, () => {
    component.ngOnInit();
    expect(component.title).toEqual('assignment-hacker-news');
  });

  it(`should have isLoading as true initially`, () => {
    component.ngOnInit();
    expect(component.isLoading).toBeTruthy();
  });

  it(`should have chart type as 'line' and legend as false`, () => {
    component.ngOnInit();
    expect(component.lineChartType).toEqual('line');
    expect(component.lineChartLegend).toBeFalse();
  });

  it('fetch news feed on get news feed called', fakeAsync(() => {
    const spy = spyOn(newsApiService, 'getNewsFeed').and.returnValue(of({
      hits: [],
      nbPages: 1,
      page: 0,
    }));
    component.getNewsFeed({page: 0});
    spy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
    fixture.destroy();
    flush();
  }));
});

