import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-video-tiles',
  templateUrl: './video-tiles.component.html',
  styleUrls: ['./video-tiles.component.css'],
})
export class VideoTilesComponent implements OnInit, OnDestroy {
  readonly MAX_SEARCH_RESULTS = 25;
  private readonly simulateLoad = true; // Set this to false if using an API token.

  @Output() updateCount = new EventEmitter<any>();
  @Input() query = '';
  @Input() events: Observable<any> = new Observable<any>();

  selectedVideo = undefined;
  loading: boolean = false;
  videos: any[] = [];
  nextPageToken: string | undefined = undefined;

  videoTilesSubject: Subject<any> = new Subject<any>();
  private eventsSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private youtubeApiService: YoutubeApiService
  ) {}
  ngOnInit(): void {
    this.reloadContent();
    this.eventsSubscription = this.events.subscribe((event) => {
      switch (event.mode) {
        case 0: {
          this.loadContent();
          break;
        }
        case 1: {
          this.reloadContent();
          break;
        }
        default:
          throw Error('Unsupported event mode: ' + event.mode);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  selectVideoToPlay(video: any): void {
    this.selectedVideo = video;
    console.log('selected video to play');
    console.log(this.selectedVideo);
    
  }


  reloadContent() {
    this.selectedVideo = undefined;
    this.videos = [];
    this.loadContent();
  }

  loadContent() {
    if (!this.loading) {
      this.loading = true;

      if (this.simulateLoad) {
        fetch('../../../assets/sample-video.json')
          .then((response) => response.json())
          .then((newVideos) => {
            this.videos = [...this.videos, ...newVideos];

            this.updateCount.emit(this.videos.length);
            console.log('video size: ' + this.videos.length);
            this.loading = false;
          });
      } else {
        this.youtubeApiService
          .searchVideos(
            '"dog" ' + this.query,
            this.nextPageToken ? this.nextPageToken : 'none',
            this.MAX_SEARCH_RESULTS
          )
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

              this.updateCount.emit(this.videos.length);
              console.log('video size: ' + this.videos.length);
              this.loading = false;
            },
            (error: any) => {
              console.error('Error fetching videos:', error);
              this.loading = false;
            }
          );
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (!this.loading && event.target.scrollTop !== 0 
      && event.target.scrollHeight - event.target.scrollTop <=
      event.target.clientHeight
    ) {
      this.loadContent();
    }
  }

  closeVideo(event: any): void {
    this.selectedVideo = undefined;
  }
}
