"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var auth_1 = require("@angular/fire/auth");
var angularx_social_login_1 = require("angularx-social-login");
var angularx_social_login_2 = require("angularx-social-login");
var config = {
    apiKey: "AIzaSyC7Kraw5LTB1NJjG8v-m4ruthOttQlUVN0",
    authDomain: "mowube.firebaseapp.com",
    databaseURL: "https://mowube.firebaseio.com",
    projectId: "mowube",
    storageBucket: "mowube.appspot.com",
    messagingSenderId: "672247881948",
    appId: "1:672247881948:web:2eba9fefb7514ca63bd419",
    measurementId: "G-HR672K792Y"
};
var app_component_1 = require("./app.component");
var header_component_1 = require("./header/header.component");
var content_component_1 = require("./content/content.component");
var home_not_user_component_1 = require("./home-not-user/home-not-user.component");
var trending_list_component_1 = require("./trending-list/trending-list.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
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
var dropzone_directive_1 = require("./dropzone.directive");
var upload_task_component_1 = require("./upload-task/upload-task.component");
var uploader_component_1 = require("./uploader/uploader.component");
var graphql_module_1 = require("./graphql.module");
var http_1 = require("@angular/common/http");
var video_reply_component_1 = require("./video-reply/video-reply.component");
var video_reply_replies_component_1 = require("./video-reply-replies/video-reply-replies.component");
var video_play_list_component_1 = require("./video-play-list/video-play-list.component");
var video_box_component_1 = require("./video-box/video-box.component");
var video_genre_component_1 = require("./video-genre/video-genre.component");
var community_comment_component_1 = require("./community-comment/community-comment.component");
var animations_1 = require("@angular/platform-browser/animations");
var playlist_box_component_1 = require("./playlist-box/playlist-box.component");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var mat_video_1 = require("mat-video");
var search_page_component_1 = require("./search-page/search-page.component");
var search_channel_box_component_1 = require("./search-channel-box/search-channel-box.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                content_component_1.ContentComponent,
                home_not_user_component_1.HomeNotUserComponent,
                trending_list_component_1.TrendingListComponent,
                sidebar_component_1.SidebarComponent,
                gaming_component_1.GamingComponent,
                premium_not_user_component_1.PremiumNotUserComponent,
                video_play_component_1.VideoPlayComponent,
                video_playlist_component_1.VideoPlaylistComponent,
                subscriptions_component_1.SubscriptionsComponent,
                channel_component_1.ChannelComponent,
                channel_videos_component_1.ChannelVideosComponent,
                channel_description_component_1.ChannelDescriptionComponent,
                community_component_1.CommunityComponent,
                channel_home_component_1.ChannelHomeComponent,
                channel_playlist_component_1.ChannelPlaylistComponent,
                dropzone_directive_1.DropzoneDirective,
                upload_task_component_1.UploadTaskComponent,
                uploader_component_1.UploaderComponent,
                video_reply_component_1.VideoReplyComponent,
                video_reply_replies_component_1.VideoReplyRepliesComponent,
                video_play_list_component_1.VideoPlayListComponent,
                video_box_component_1.VideoBoxComponent,
                video_genre_component_1.VideoGenreComponent,
                community_comment_component_1.CommunityCommentComponent,
                playlist_box_component_1.PlaylistBoxComponent,
                search_page_component_1.SearchPageComponent,
                search_channel_box_component_1.SearchChannelBoxComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                fire_1.AngularFireModule.initializeApp(config),
                firestore_1.AngularFirestoreModule,
                auth_1.AngularFireAuthModule,
                storage_1.AngularFireStorageModule,
                graphql_module_1.GraphQLModule,
                http_1.HttpClientModule,
                angularx_social_login_1.SocialLoginModule,
                animations_1.BrowserAnimationsModule,
                drag_drop_1.DragDropModule,
                mat_video_1.MatVideoModule,
            ],
            providers: [
                {
                    provide: 'SocialAuthServiceConfig',
                    useValue: {
                        autoLogin: false,
                        providers: [
                            {
                                id: angularx_social_login_2.GoogleLoginProvider.PROVIDER_ID,
                                provider: new angularx_social_login_2.GoogleLoginProvider('384162130645-dta54fuurfn5na5ljm978sd6s70qsupi.apps.googleusercontent.com')
                            },
                        ]
                    }
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
