// Imported Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// App Routing
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VideoComponent } from './components/video/video.component';
import { VideoContainerComponent } from './components/video-container/video-container.component';

// Services
import { YoutubeApiService } from './services/youtube-api.service';

// Routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:videoId', component: VideoComponent }, // Define route for VideoComponent with videoId parameter
  { path: '**', redirectTo: '' } // Redirect to HomeComponent for unknown routes
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoComponent,
    VideoContainerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  exports: [RouterModule],
  providers: [YoutubeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
