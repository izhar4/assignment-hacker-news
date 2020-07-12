import { TestBed, async, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsListComponent } from './news-list.component';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import { NewsApiService } from '../../../services/news-api.service';

describe('AppComponent', () => {
  let component: NewsListComponent;
  let newsApiService: NewsApiService;

  let fixture: ComponentFixture<NewsListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        NewsListComponent
      ],
      providers: [NewsApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    newsApiService = TestBed.inject(NewsApiService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
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

