// Imported Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


// App Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VideoComponent } from './components/video/video.component';

// Services
import { YoutubeApiService } from './services/youtube-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [YoutubeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
