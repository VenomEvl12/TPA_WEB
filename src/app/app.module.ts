import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const config = {
  apiKey: "AIzaSyC7Kraw5LTB1NJjG8v-m4ruthOttQlUVN0",
  authDomain: "mowube.firebaseapp.com",
  databaseURL: "https://mowube.firebaseio.com",
  projectId: "mowube",
  storageBucket: "mowube.appspot.com",
  messagingSenderId: "672247881948",
  appId: "1:672247881948:web:2eba9fefb7514ca63bd419",
  measurementId: "G-HR672K792Y"
};


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { HomeNotUserComponent } from './home-not-user/home-not-user.component';
import { HomeNotUserVideoComponent } from './home-not-user-video/home-not-user-video.component';
import { TrendingListComponent } from './trending-list/trending-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MusicComponent } from './genre/music/music.component';
import { GamingComponent } from './genre/gaming/gaming.component';
import { NewsComponent } from './genre/news/news.component';
import { MovieComponent } from './genre/movie/movie.component';
import { PremiumNotUserComponent } from './content-premium/premium-not-user/premium-not-user.component';
import { VideoPlayComponent } from './video-play/video-play.component';
import { VideoPlaylistComponent } from './video-playlist/video-playlist.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ChannelComponent } from './channel/channel.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';
import { ChannelDescriptionComponent } from './channel/channel-stuff/channel-description/channel-description.component';
import { CommunityComponent } from './channel/channel-stuff/community/community.component';
import { ChannelHomeComponent } from './channel/channel-stuff/channel-home/channel-home.component';
import { ChannelPlaylistComponent } from './channel/channel-stuff/channel-playlist/channel-playlist.component';
import { DropzoneDirective } from './dropzone.directive';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { UploaderComponent } from './uploader/uploader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    HomeNotUserComponent,
    HomeNotUserVideoComponent,
    TrendingListComponent,
    SidebarComponent,
    MusicComponent,
    GamingComponent,
    NewsComponent,
    MovieComponent,
    PremiumNotUserComponent,
    VideoPlayComponent,
    VideoPlaylistComponent,
    SubscriptionsComponent,
    ChannelComponent,
    ChannelVideosComponent,
    ChannelDescriptionComponent,
    CommunityComponent,
    ChannelHomeComponent,
    ChannelPlaylistComponent,
    DropzoneDirective,
    UploadTaskComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
