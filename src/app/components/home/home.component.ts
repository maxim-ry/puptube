import { Component, HostListener } from '@angular/core';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  videos: any[] = [];
  query: string = '';
  loading: boolean = false;

  count: number = 0;

  constructor(private youtubeApiService: YoutubeApiService) {
    // Generate dummy video data
    for (let i = 0; i < 20; i++) {
      this.videos.push({
        id: `video_${this.count}`,
        snippet: {
          title: `Dummy Title ${this.count + 1}`,
          description: `Dummy Description ${this.count + 1}`,
          thumbnails: {
            high: { url: 'https://archive.org/download/placeholder-image//placeholder-image.jpg' }
          }
        }
      });
      this.count++;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = window.innerHeight;
  const documentHeight = document.body.scrollHeight;
  const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (windowHeight + scrollPosition >= documentHeight - 50) {
    this.loadMoreContent();
  }
  }

  loadMoreContent() {
    for (let i = 0; i < 20; i++) {
      this.videos.push({
        id: `video_${this.count}`,
        snippet: {
          title: `Dummy Title ${this.count + 1}`,
          description: `Dummy Description ${this.count + 1}`,
          thumbnails: {
            high: { url: 'https://archive.org/download/placeholder-image//placeholder-image.jpg' }
          }
        }
      });
      this.count++;
    }
  }

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(): void {
    this.loading = true;
    this.youtubeApiService.searchVideos('"dog" ' + this.query).subscribe(
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
