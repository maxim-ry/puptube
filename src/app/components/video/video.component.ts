import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  video: any;
  videoUrl: SafeResourceUrl | null = null;
  descriptionParagraphs: string[] = [];
  showDescription = false;

  constructor(
    private route: ActivatedRoute,
    private youtubeApiService: YoutubeApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const videoData = history.state.videoData;
      this.video = videoData;
      const videoId = videoData.id.videoId;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`);
      this.fetchVideoDetails(videoId);
    });
  }

  fetchVideoDetails(videoId: string): void {
    this.youtubeApiService.getVideoDetails(videoId).subscribe(
      (response: any) => {
        const description = response.items[0].snippet.description;
        this.descriptionParagraphs = description.split('\n');
      },
      (error: any) => {
        console.error('Error fetching video details:', error);
      }
    );
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }
}
