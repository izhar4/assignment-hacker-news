import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { NewsApiService } from '../../../services/news-api.service';
import { CHART_OPTIONS } from '../../../constants/common-constants';
import { map, catchError } from 'rxjs/operators';
import { ICommonResponse } from '../../../../app/models/common-response';
import { trackByFn, changeQueryParams, updateLocalStorage, getChartData,
  updateVotesAndHidden } from '../../../../app/utills/common.utill';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  isLoading = true;
  newsFeed$;
  title = 'assignment-hacker-news';
  isBrowser = false;
  public lineChartData = [
    { data: [] }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = CHART_OPTIONS;
  public lineChartColors: Color[] = [
    {
      borderColor: '#3dc4cd',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  currentPage;
  lastPage;
  trackByFn = trackByFn;
  newsFeed;
  constructor(
    @Inject(PLATFORM_ID) platformId: string, private readonly newsApiService: NewsApiService,
    private readonly route: ActivatedRoute, private readonly router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit() {
    this.subscribeQueryParams();
  }

  subscribeQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.getNewsFeed({ ...params });
    });
  }

  nextPage() {
    if (this.currentPage < this.lastPage) {
      changeQueryParams({ page: this.currentPage + 1 }, this.route, this.router);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      changeQueryParams({ page: this.currentPage - 1 }, this.route, this.router);
    }
  }

  getNewsFeed(params) {
    this.isLoading = true;
    this.newsFeed$ = this.newsApiService.getNewsFeed<ICommonResponse>(params).pipe(
      map(res => {
        this.lastPage = res.nbPages;
        this.currentPage = res.page;
        this.isLoading = false;
        this.newsFeed =  updateVotesAndHidden(res.hits);
        const {data, labels } = getChartData(this.newsFeed);
        this.lineChartData = [
          {
            data
          }
        ];
        this.lineChartLabels = labels;
        return res;
      }),
      catchError(error => {
        this.isLoading = false;
        return of(error);
      })
    );
  }

  hideNews(index) {
    let hiddenNews = this.newsFeed.splice(index, 1)[0];
    hiddenNews = {
      ...hiddenNews,
      hidden: true
    };
    this.updateStorage(hiddenNews);
    this.lineChartData[0].data.splice(index, 1);
    this.lineChartLabels.splice(index, 1);
  }

  upVote(index) {
    const news = { ...this.newsFeed[index] };
    news.points = news.points + 1;
    this.updateStorage(news);
    this.newsFeed[index] = { ...news };
    this.lineChartData[0].data[index] = news.points;
  }

  updateStorage(news) {
    updateLocalStorage(news);
  }


}

