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
exports.PlaylistBoxComponent = exports.deleteVideo = exports.getVideo = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getVideo = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getVideo($videoID: ID!){\n  Videos(videoID: $videoID){\n    user{\n      username\n    }\n    thumbnail\n    title\n  }\n}\n"], ["\nquery getVideo($videoID: ID!){\n  Videos(videoID: $videoID){\n    user{\n      username\n    }\n    thumbnail\n    title\n  }\n}\n"])));
exports.deleteVideo = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation deleteVideo($userID: ID!, $playlistID: ID!, $videoID: ID!){\n  deleteVideo(userID: $userID,playlistID: $playlistID, videoID: $videoID)\n}\n"], ["\nmutation deleteVideo($userID: ID!, $playlistID: ID!, $videoID: ID!){\n  deleteVideo(userID: $userID,playlistID: $playlistID, videoID: $videoID)\n}\n"])));
var PlaylistBoxComponent = /** @class */ (function () {
    function PlaylistBoxComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    PlaylistBoxComponent.prototype.ngOnInit = function () {
        this.playlistID = this.route.snapshot.paramMap.get('id');
        this.getVideoAttribute();
    };
    PlaylistBoxComponent.prototype.getVideoAttribute = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getVideo, variables: {
                videoID: this.video.videoID
            }
        }).valueChanges.subscribe(function (result) {
            _this.dataVideo = result.data.Videos;
        });
    };
    PlaylistBoxComponent.prototype.deleteVideo = function () {
        console.log(this.video.userID, this.playlistID, this.video.videoID);
        this.apollo.mutate({
            mutation: exports.deleteVideo, variables: {
                userID: this.video.userID,
                playlistID: this.playlistID,
                videoID: this.video.videoID
            }
        }).subscribe(function (result) {
            alert('success!');
        });
    };
    __decorate([
        core_1.Input('video')
    ], PlaylistBoxComponent.prototype, "video");
    PlaylistBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist-box',
            templateUrl: './playlist-box.component.html',
            styleUrls: ['./playlist-box.component.sass']
        })
    ], PlaylistBoxComponent);
    return PlaylistBoxComponent;
}());
exports.PlaylistBoxComponent = PlaylistBoxComponent;
var templateObject_1, templateObject_2;
