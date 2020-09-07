"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VideoBoxComponent = exports.retrieveFromPlaylist = exports.insertToPlaylist = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.insertToPlaylist = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation insertToPlaylist($userID: ID!, $playlistID: ID!, $videoID: ID!){\n  inputVideoToPlayList(input:{\n    userID: $userID\n    playlistID: $playlistID\n    videoID: $videoID\n  }){\n    playlistHeader\n  }\n}\n\n"], ["\nmutation insertToPlaylist($userID: ID!, $playlistID: ID!, $videoID: ID!){\n  inputVideoToPlayList(input:{\n    userID: $userID\n    playlistID: $playlistID\n    videoID: $videoID\n  }){\n    playlistHeader\n  }\n}\n\n"])));
exports.retrieveFromPlaylist = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery getPlaylist($userID: ID!){\n  playlists(userID: $userID){\n    playlistHeader\n    playlistID\n  }\n}\n"], ["\nquery getPlaylist($userID: ID!){\n  playlists(userID: $userID){\n    playlistHeader\n    playlistID\n  }\n}\n"])));
var VideoBoxComponent = /** @class */ (function () {
    function VideoBoxComponent(router, apollo) {
        this.router = router;
        this.apollo = apollo;
    }
    VideoBoxComponent.prototype.ngOnInit = function () {
        this.showSetting = false;
        this.userID = localStorage.getItem('userID');
        this.showModal = false;
        if (this.userID != null) {
            this.getPlaylist();
        }
    };
    VideoBoxComponent.prototype.hide = function () {
        if (this.showSetting == false) {
            this.showSetting = true;
        }
        else {
            this.showSetting = false;
        }
    };
    VideoBoxComponent.prototype.onSelect = function () {
        this.router.navigate(['/main/videoPlayer', this.video.videoID]);
    };
    VideoBoxComponent.prototype.onSelectUser = function () {
        this.router.navigate(['main/channel', this.video.user.id, 'home']);
    };
    VideoBoxComponent.prototype.getPlaylist = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrieveFromPlaylist, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.playlistTitles = result.data.playlists;
        });
    };
    VideoBoxComponent.prototype.clickPlaylist = function (playlistID) {
        console.log(playlistID, this.userID, this.video.videoID);
        if (this.userID == null) {
            return;
        }
        var bool = confirm("are you sure insert this to playlist ?");
        if (bool) {
            this.apollo.mutate({
                mutation: exports.insertToPlaylist, variables: {
                    userID: this.userID,
                    playlistID: playlistID,
                    videoID: this.video.videoID
                }
            }).subscribe(function (result) {
                alert('insert to playlist success !');
                window.location.reload();
            });
        }
        else {
            alert('cancel insert to playlist');
        }
    };
    VideoBoxComponent.prototype.showPlaylistModal = function () {
        if (this.showModal) {
            this.showModal = false;
        }
        else {
            this.showModal = true;
        }
    };
    __decorate([
        core_1.Input("video")
    ], VideoBoxComponent.prototype, "video");
    VideoBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-video-box',
            templateUrl: './video-box.component.html',
            styleUrls: ['./video-box.component.sass']
        })
    ], VideoBoxComponent);
    return VideoBoxComponent;
}());
exports.VideoBoxComponent = VideoBoxComponent;
var templateObject_1, templateObject_2;
