import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit, OnDestroy {
  @Input() video: any;
  @Output() closeVideo = new EventEmitter<any>();
  videoUrl: SafeResourceUrl | null = null;
  descriptionParagraphs: string[] = [];
  showDescription = false;

  constructor(
    private route: ActivatedRoute,
    private youtubeApiService: YoutubeApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const videoId = this.video.id.videoId;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
    );
    this.fetchVideoDetails(videoId);
  }

  ngOnDestroy(): void {
    console.log('Video player view is destroyed');
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

  onCloseVideo() {
    console.log('Close video event');
    this.closeVideo.emit(this.video);
  }
}
