import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDateTimePipe } from './news-date-time.pipe';



@NgModule({
  declarations: [NewsDateTimePipe],
  imports: [
    CommonModule
  ],
  exports: [NewsDateTimePipe]
})
export class NewsDateTimePipeModule { }
