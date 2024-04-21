import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  videoTilesSubject: Subject<any> = new Subject<any>();
  query: string = '';
  count = 0;

  ngOnInit(): void {}

  onSubmit(): void {
    this.videoTilesSubject.next({ mode: 1 });
  }

  updateCount(event: any): void {
    console.log('received on count update event');
    this.count = event;
  }

  onSizeChange(size: any): void {
    console.log(size);
  }
}
