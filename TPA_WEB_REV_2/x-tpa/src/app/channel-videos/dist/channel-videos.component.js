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
exports.ChannelVideosComponent = exports.getVideos = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getVideos = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getVideos($userID: ID!, $restriction: Boolean!, $premium: Boolean!){\n\tvideoByUser(userID: $userID, restriction: $restriction, premium: $premium){\n    videoID\n    title\n    thumbnail\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n    user{\n      id\n      username\n      thumbnail\n      premium\n    }\n  }\n}\n"], ["\nquery getVideos($userID: ID!, $restriction: Boolean!, $premium: Boolean!){\n\tvideoByUser(userID: $userID, restriction: $restriction, premium: $premium){\n    videoID\n    title\n    thumbnail\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n    user{\n      id\n      username\n      thumbnail\n      premium\n    }\n  }\n}\n"])));
var ChannelVideosComponent = /** @class */ (function () {
    function ChannelVideosComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
        this.lastKey = 0;
    }
    ChannelVideosComponent.prototype.ngOnInit = function () {
        this.userID = this.route.snapshot.parent.paramMap.get('id');
        this.res = JSON.parse(localStorage.getItem('restriction'));
        this.premium = JSON.parse(localStorage.getItem('premium'));
        if (this.res == null) {
            this.res = true;
            this.premium = false;
        }
        else {
            this.res = false;
            this.premium = false;
        }
        this.lastKey = 12;
        this.getVideos();
    };
    ChannelVideosComponent.prototype.getVideos = function () {
        var _this = this;
        console.log(this.userID, this.res);
        this.apollo.watchQuery({
            query: exports.getVideos, variables: {
                userID: this.userID,
                restriction: this.res,
                premium: this.premium
            }
        }).valueChanges.subscribe(function (result) {
            _this.videos = result.data.videoByUser;
            _this.obServer = new IntersectionObserver(function (entry) {
                if (entry[0].isIntersecting) {
                    var card = document.querySelector(".cards");
                    for (var i = 0; i < 4; i++) {
                        if (_this.lastKey < _this.videos.length) {
                            var div = document.createElement('span');
                            var vid = document.createElement('app-video-box');
                            vid.setAttribute("video", "this.videos[this.lastKey]");
                            div.appendChild(vid);
                            card.appendChild(div);
                            _this.lastKey++;
                        }
                    }
                }
            });
            _this.obServer.observe(document.querySelector('.footersss'));
        });
    };
    ChannelVideosComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-videos',
            templateUrl: './channel-videos.component.html',
            styleUrls: ['./channel-videos.component.sass']
        })
    ], ChannelVideosComponent);
    return ChannelVideosComponent;
}());
exports.ChannelVideosComponent = ChannelVideosComponent;
var templateObject_1;
