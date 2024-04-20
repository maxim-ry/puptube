import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent {
  @Input() video: any;
}
