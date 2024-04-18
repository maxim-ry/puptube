import { Component, OnInit } from '@angular/core';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  videos: any[] = [];

  loading: boolean = false;

  constructor(private youtubeApiService: YoutubeApiService) {}

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(): void {
    this.loading = true;
    const query = 'dogs'; // Hardcoded search query for now
    this.youtubeApiService.searchVideos(query).subscribe(
      (response: any) => {
        this.videos = response.items;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching videos:', error);
        this.loading = false;
      }
    );
  }
}
