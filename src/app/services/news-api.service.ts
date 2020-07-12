import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private readonly http: HttpClient) { }

  getNewsFeed<T>(params) {
    return this.http.get<T>('https://hn.algolia.com/api/v1/search', { params });
  }
}
