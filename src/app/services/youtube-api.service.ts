import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly MAX_SEARCH_RESULT = '2';
  private readonly apiKey = 'API_KEY';
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchVideos(query: string, nextPageToken?: string): Observable<any> {
    let params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('type', 'video')
      .set('maxResults', this.MAX_SEARCH_RESULT)
      .set('key', this.apiKey);

    if (nextPageToken) {
      params = params.set('pageToken', nextPageToken);
    }

    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  getVideoDetails(videoId: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet,contentDetails')
      .set('id', videoId)
      .set('key', this.apiKey);

    return this.http.get(`${this.apiUrl}/videos`, { params });
  }
}
