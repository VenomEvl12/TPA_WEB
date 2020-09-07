"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_not_user_component_1 = require("./home-not-user/home-not-user.component");
var content_component_1 = require("./content/content.component");
var trending_list_component_1 = require("./trending-list/trending-list.component");
var gaming_component_1 = require("./genre/gaming/gaming.component");
var premium_not_user_component_1 = require("./content-premium/premium-not-user/premium-not-user.component");
var video_play_component_1 = require("./video-play/video-play.component");
var video_playlist_component_1 = require("./video-playlist/video-playlist.component");
var subscriptions_component_1 = require("./subscriptions/subscriptions.component");
var channel_component_1 = require("./channel/channel.component");
var channel_videos_component_1 = require("./channel-videos/channel-videos.component");
var channel_description_component_1 = require("./channel/channel-stuff/channel-description/channel-description.component");
var community_component_1 = require("./channel/channel-stuff/community/community.component");
var channel_home_component_1 = require("./channel/channel-stuff/channel-home/channel-home.component");
var channel_playlist_component_1 = require("./channel/channel-stuff/channel-playlist/channel-playlist.component");
var uploader_component_1 = require("./uploader/uploader.component");
var search_page_component_1 = require("./search-page/search-page.component");
var routes = [
    { path: '', redirectTo: '/main/home', pathMatch: 'full' },
    { path: 'main', component: content_component_1.ContentComponent, children: [
            { path: 'home', component: home_not_user_component_1.HomeNotUserComponent },
            { path: 'trending', component: trending_list_component_1.TrendingListComponent },
            { path: 'playlist/:id', component: video_playlist_component_1.VideoPlaylistComponent },
            { path: 'category/:id', component: gaming_component_1.GamingComponent },
            { path: 'premium', component: premium_not_user_component_1.PremiumNotUserComponent },
            { path: 'upload', component: uploader_component_1.UploaderComponent },
            { path: 'videoPlayer/:id', component: video_play_component_1.VideoPlayComponent },
            { path: 'search/keyword/:id', component: search_page_component_1.SearchPageComponent },
            { path: 'subscriptions', component: subscriptions_component_1.SubscriptionsComponent },
            {
                path: 'channel/:id', component: channel_component_1.ChannelComponent, children: [
                    { path: 'videos', component: channel_videos_component_1.ChannelVideosComponent },
                    { path: 'about', component: channel_description_component_1.ChannelDescriptionComponent },
                    { path: 'community', component: community_component_1.CommunityComponent },
                    { path: 'home', component: channel_home_component_1.ChannelHomeComponent },
                    { path: 'playlist', component: channel_playlist_component_1.ChannelPlaylistComponent }
                ]
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
