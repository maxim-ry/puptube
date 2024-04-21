import { Component, HostListener } from '@angular/core';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  videos: any[] = [];
  query: string = '';
  searchResult = 10;
  loading: boolean = false;
  nextPageToken: string | undefined = undefined;

  constructor(
    private router: Router,
    private youtubeApiService: YoutubeApiService
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (windowHeight + scrollPosition >= documentHeight - 50) {
      this.loadMoreContent();
    }
  }

  loadMoreContent() {
    if (this.nextPageToken && !this.loading) {
      this.loading = true;
      this.youtubeApiService
        .searchVideos('"dog" ' + this.query, this.nextPageToken)
        .subscribe(
          (response: any) => {
            const newVideos = response.items.filter((video: any) => {
              return !this.videos.some(
                (existingVideo: any) =>
                  existingVideo.id.videoId === video.id.videoId
              );
            });

            this.videos = [...this.videos, ...newVideos];
            this.nextPageToken = response.nextPageToken;
            this.loading = false;
          },
          (error: any) => {
            console.error('Error fetching videos:', error);
            this.loading = false;
          }
        );
    }
  }

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(): void {
    window.scrollTo(0, 0);
    this.loading = true;
    this.youtubeApiService.searchVideos('"dog" ' + this.query).subscribe(
      (response: any) => {
        this.videos = response.items;
        this.nextPageToken = response.nextPageToken;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error fetching videos:', error);
        this.loading = false;
      }
    );
  }

  navigateToVideo(video: any): void {
    this.router.navigate(['/video', video.id.videoId], {
      state: { videoData: video },
    });
  }

  onSizeChange(size: any): void {
    console.log(size);
  }
}
