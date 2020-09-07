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
exports.SubscriptionsComponent = exports.getVideos = exports.getSubVal = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getSubVal = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getSubsVal($userID: ID!){\n  getChannelSubscribe(userID: $userID){\n    channelID\n    subscribe\n    channelUserID\n  }\n}\n"], ["\nquery getSubsVal($userID: ID!){\n  getChannelSubscribe(userID: $userID){\n    channelID\n    subscribe\n    channelUserID\n  }\n}\n"])));
exports.getVideos = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery getSubsVal($userID: ID!, $restriction: Boolean!, $premium: Boolean!){\n  videoByUser(userID: $userID, restriction: $restriction, premium: $premium){\n    videoID\n    user{\n      id\n      username\n      thumbnail\n      premium\n    }\n    title\n    thumbnail\n    views\n    descriptions\n    sourceLink\n    videoLength\n    day\n    month\n    year\n  }\n}\n"], ["\nquery getSubsVal($userID: ID!, $restriction: Boolean!, $premium: Boolean!){\n  videoByUser(userID: $userID, restriction: $restriction, premium: $premium){\n    videoID\n    user{\n      id\n      username\n      thumbnail\n      premium\n    }\n    title\n    thumbnail\n    views\n    descriptions\n    sourceLink\n    videoLength\n    day\n    month\n    year\n  }\n}\n"])));
var SubscriptionsComponent = /** @class */ (function () {
    function SubscriptionsComponent(apollo) {
        this.apollo = apollo;
        this.videos = [];
        this.videosToday = [];
        this.videosWeek = [];
        this.videosYear = [];
    }
    SubscriptionsComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.userID = localStorage.getItem('userID');
        this.restriction = JSON.parse(localStorage.getItem('restriction'));
        this.premium = JSON.parse(localStorage.getItem('premium'));
        this.showSubs = false;
        if (this.userID == null) {
            this.message = "Sign in";
        }
        else {
            this.getVideos();
        }
    };
    SubscriptionsComponent.prototype.getVideos = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getSubVal, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.listSubs = result.data.getChannelSubscribe;
            if (_this.listSubs.length == 0) {
                _this.message = "Subscribe";
            }
            else {
                _this.showSubs = true;
                for (var i = 0; i < _this.listSubs.length; i++) {
                    console.log(_this.listSubs[0].channelUserID);
                    _this.apollo.watchQuery({
                        query: exports.getVideos, variables: {
                            userID: _this.listSubs[i].channelUserID,
                            restriction: _this.restriction,
                            premium: _this.premium
                        }
                    }).valueChanges.subscribe(function (result) {
                        for (var i_1 = 0; i_1 < result.data.videoByUser.length; i_1++) {
                            _this.videos.push(result.data.videoByUser[i_1]);
                            if (result.data.videoByUser[i_1].day == _this.day && result.data.videoByUser[i_1].month == _this.month && result.data.videoByUser[i_1].year == _this.year) {
                                _this.videosToday.push(result.data.videoByUser[i_1]);
                            }
                            else if (result.data.videoByUser[i_1].day > _this.day - 8 && result.data.videoByUser[i_1].month == _this.month && result.data.videoByUser[i_1].year == _this.year) {
                                _this.videosWeek.push(result.data.videoByUser[i_1]);
                            }
                            else {
                                _this.videosYear.push(result.data.videoByUser[i_1]);
                            }
                        }
                    });
                }
            }
        });
    };
    SubscriptionsComponent = __decorate([
        core_1.Component({
            selector: 'app-subscriptions',
            templateUrl: './subscriptions.component.html',
            styleUrls: ['./subscriptions.component.sass']
        })
    ], SubscriptionsComponent);
    return SubscriptionsComponent;
}());
exports.SubscriptionsComponent = SubscriptionsComponent;
var templateObject_1, templateObject_2;
