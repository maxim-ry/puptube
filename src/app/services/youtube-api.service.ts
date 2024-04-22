import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  private readonly apiKey = ENVIRONMENT.API_KEY; // INSERT API KEY HERE
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  searchVideos(query: string, nextPageToken: string, maxResults: number): Observable<any> {
    let params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('type', 'video')
      .set('maxResults', maxResults)
      .set('key', this.apiKey);

    if (nextPageToken && nextPageToken !== 'none') {
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
