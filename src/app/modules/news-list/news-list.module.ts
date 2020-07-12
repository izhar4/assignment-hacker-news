import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsListRoutingModule } from './news-list-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { ChartsModule } from 'ng2-charts';
import { NewsDateTimePipeModule } from '../../shared/news-date-time-pipe/news-date-time-pipe.module';


@NgModule({
  declarations: [NewsListComponent],
  imports: [
    CommonModule,
    NewsListRoutingModule,
    ChartsModule,
    NewsDateTimePipeModule
  ]
})
export class NewsListModule { }
