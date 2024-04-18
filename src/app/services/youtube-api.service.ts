import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  private readonly apiKey = 'API_KEY';
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) { }

  searchVideos(query: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('type', 'video')
      .set('maxResults', '10')
      
      .set('key', this.apiKey);
  
    return this.http.get(this.apiUrl, { params });
  }
  
  
}
