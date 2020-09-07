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
exports.ChannelHomeComponent = exports.getRandomVideos = exports.getLastVideos = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getLastVideos = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getVideo($userID: ID!, $premium: Boolean!, $restriction: Boolean!){\n\tgetLastVideos(userID: $userID, restriction: $restriction, premium: $premium){\n    videoID\n    title\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n  }\n}\n"], ["\nquery getVideo($userID: ID!, $premium: Boolean!, $restriction: Boolean!){\n\tgetLastVideos(userID: $userID, restriction: $restriction, premium: $premium){\n    videoID\n    title\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n  }\n}\n"])));
exports.getRandomVideos = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery getRandom($userID: ID!, $restriction: Boolean!, $premium: Boolean!){\n  getFiveRandomVideos(userID: $userID, restriction: $restriction,premium: $premium){\n    videoID\n    user{\n      id\n      username\n      thumbnail\n    }\n    title\n    thumbnail\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n  }\n}\n"], ["\nquery getRandom($userID: ID!, $restriction: Boolean!, $premium: Boolean!){\n  getFiveRandomVideos(userID: $userID, restriction: $restriction,premium: $premium){\n    videoID\n    user{\n      id\n      username\n      thumbnail\n    }\n    title\n    thumbnail\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n  }\n}\n"])));
var ChannelHomeComponent = /** @class */ (function () {
    function ChannelHomeComponent(apollo, router) {
        this.apollo = apollo;
        this.router = router;
    }
    ChannelHomeComponent.prototype.ngOnInit = function () {
        this.channelUserID = this.router.snapshot.parent.paramMap.get('id');
        this.premium = false;
        this.restriction = true;
        this.user = localStorage.getItem('user');
        if (this.user == null) {
            this.premium = JSON.parse(localStorage.getItem('premium'));
            this.restriction = JSON.parse(localStorage.getItem('restriction'));
        }
        this.getRecentVideos();
        this.getRandomVideos();
    };
    ChannelHomeComponent.prototype.getRecentVideos = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getLastVideos, variables: {
                userID: this.channelUserID,
                restriction: this.restriction,
                premium: this.premium
            }
        }).valueChanges.subscribe(function (result) {
            _this.recentVideos = result.data.getLastVideos;
        });
    };
    ChannelHomeComponent.prototype.getRandomVideos = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getRandomVideos, variables: {
                userID: this.channelUserID,
                restriction: this.restriction,
                premium: this.premium
            }
        }).valueChanges.subscribe(function (result) { _this.videos = result.data.getFiveRandomVideos; });
    };
    ChannelHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-home',
            templateUrl: './channel-home.component.html',
            styleUrls: ['./channel-home.component.sass']
        })
    ], ChannelHomeComponent);
    return ChannelHomeComponent;
}());
exports.ChannelHomeComponent = ChannelHomeComponent;
var templateObject_1, templateObject_2;
