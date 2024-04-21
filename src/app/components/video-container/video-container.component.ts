import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css'],
})
export class VideoContainerComponent implements OnInit {
  @Input() video: any;

  ngOnInit(): void {
     console.log(this.video);
  }
}
