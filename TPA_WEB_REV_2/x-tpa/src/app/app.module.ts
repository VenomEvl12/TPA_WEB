import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';

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
import { TrendingListComponent } from './trending-list/trending-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GamingComponent } from './genre/gaming/gaming.component';
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
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { VideoReplyComponent } from './video-reply/video-reply.component';
import { VideoReplyRepliesComponent } from './video-reply-replies/video-reply-replies.component';
import { VideoPlayListComponent } from './video-play-list/video-play-list.component';
import { VideoBoxComponent } from './video-box/video-box.component';
import { VideoGenreComponent } from './video-genre/video-genre.component';
import { CommunityCommentComponent } from './community-comment/community-comment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaylistBoxComponent } from './playlist-box/playlist-box.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatVideoModule } from 'mat-video';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchChannelBoxComponent } from './search-channel-box/search-channel-box.component';
import { ChannelPlaylistBoxComponent } from './channel-playlist-box/channel-playlist-box.component';
import { ChannelVideoBoxComponent } from './channel-video-box/channel-video-box.component';
import { SearchPlaylistBoxComponent } from './search-playlist-box/search-playlist-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    HomeNotUserComponent,
    TrendingListComponent,
    SidebarComponent,
    GamingComponent,
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
    UploaderComponent,
    VideoReplyComponent,
    VideoReplyRepliesComponent,
    VideoPlayListComponent,
    VideoBoxComponent,
    VideoGenreComponent,
    CommunityCommentComponent,
    PlaylistBoxComponent,
    SearchPageComponent,
    SearchChannelBoxComponent,
    ChannelPlaylistBoxComponent,
    ChannelVideoBoxComponent,
    SearchPlaylistBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    GraphQLModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatVideoModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '384162130645-dta54fuurfn5na5ljm978sd6s70qsupi.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
