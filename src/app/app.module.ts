// Imported Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

// App Routing
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VideoComponent } from './components/video/video.component';
import { VideoContainerComponent } from './components/video-container/video-container.component';

// Services
import { YoutubeApiService } from './services/youtube-api.service';
import { VideoTilesComponent } from './components/video-tiles/video-tiles.component';

// Routes
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' } // Redirect to HomeComponent for unknown routes
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoComponent,
    VideoContainerComponent,
    VideoTilesComponent,
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
    FlexLayoutModule,
    MatTooltipModule
  ],
  exports: [RouterModule],
  providers: [YoutubeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
