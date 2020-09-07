import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeNotUserComponent } from './home-not-user/home-not-user.component';
import { ContentComponent } from './content/content.component';
import { TrendingListComponent } from './trending-list/trending-list.component';
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
import { UploaderComponent } from './uploader/uploader.component';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {path:'', redirectTo:'/main/home', pathMatch: 'full'},
  {path:'main', component: ContentComponent, children:
    [
      {path:'home', component:HomeNotUserComponent},
      {path:'trending', component:TrendingListComponent},
      {path:'playlist/:id', component:VideoPlaylistComponent},
      {path:'category/:id', component:GamingComponent},
      {path:'premium', component:PremiumNotUserComponent},
      {path:'upload', component:UploaderComponent},
      {path:'videoPlayer/:id', component:VideoPlayComponent},
      {path:'search/keyword/:id', component:SearchPageComponent},
      {path:'subscriptions', component:SubscriptionsComponent},
      {
        path:'channel/:id', component:ChannelComponent, children: [
          {path:'videos', component:ChannelVideosComponent},
          {path: 'about', component: ChannelDescriptionComponent},
          {path: 'community', component:CommunityComponent},
          {path: 'home', component:ChannelHomeComponent},
          {path: 'playlist', component:ChannelPlaylistComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
