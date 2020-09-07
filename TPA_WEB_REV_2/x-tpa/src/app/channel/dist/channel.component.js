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
exports.ChannelComponent = exports.getUser = exports.updateUserSubscribers = exports.updateSubscribe = exports.mutateSubscribe = exports.getChannel = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getChannel = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation getChannel($userID: ID!, $location: String!, $channelImage: String!){\n  createChannel(input:{\n    userID: $userID\n    location: $location\n    channelImage: $channelImage\n  }){\n    channelID\n    userID\n    viewCount\n    location\n    channelDescription\n    channelImage\n    channelBanner\n  }\n}\n"], ["\nmutation getChannel($userID: ID!, $location: String!, $channelImage: String!){\n  createChannel(input:{\n    userID: $userID\n    location: $location\n    channelImage: $channelImage\n  }){\n    channelID\n    userID\n    viewCount\n    location\n    channelDescription\n    channelImage\n    channelBanner\n  }\n}\n"])));
exports.mutateSubscribe = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation createSubscribe($userID: ID!, $channelID: ID!, $channelUserID: ID!){\n\tcreateUserSubscribe(input:{\n    userID: $userID\n    channelID: $channelID\n    channelUserID: $channelUserID\n  }){\n    userID\n    channelID\n    subscribe\n  }\n}\n"], ["\nmutation createSubscribe($userID: ID!, $channelID: ID!, $channelUserID: ID!){\n\tcreateUserSubscribe(input:{\n    userID: $userID\n    channelID: $channelID\n    channelUserID: $channelUserID\n  }){\n    userID\n    channelID\n    subscribe\n  }\n}\n"])));
exports.updateSubscribe = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation updateSubscriber($userID: ID!, $channelID: ID!){\n  updateUserSubscribe(userID: $userID, channelID: $channelID){\n    userID\n    channelID\n    subscribe\n  }\n}\n"], ["\nmutation updateSubscriber($userID: ID!, $channelID: ID!){\n  updateUserSubscribe(userID: $userID, channelID: $channelID){\n    userID\n    channelID\n    subscribe\n  }\n}\n"])));
exports.updateUserSubscribers = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation updateSubscriber($userID: ID!, $bool: Boolean!){\n  updateSubscribers(id: $userID, subscribe: $bool){\n    subscribers\n  }\n}\n"], ["\nmutation updateSubscriber($userID: ID!, $bool: Boolean!){\n  updateSubscribers(id: $userID, subscribe: $bool){\n    subscribers\n  }\n}\n"])));
exports.getUser = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nquery getUser($userID: ID!){\n  userById(id: $userID){\n    thumbnail\n    username\n    subscribers\n  }\n}\n"], ["\nquery getUser($userID: ID!){\n  userById(id: $userID){\n    thumbnail\n    username\n    subscribers\n  }\n}\n"])));
var ChannelComponent = /** @class */ (function () {
    function ChannelComponent(apollo, router, route) {
        this.apollo = apollo;
        this.router = router;
        this.route = route;
    }
    ChannelComponent.prototype.ngOnInit = function () {
        this.userID = this.router.snapshot.paramMap.get('id');
        this.userIDFromLocal = localStorage.getItem('userID');
        this.getUser();
    };
    ChannelComponent.prototype.changeColor = function () {
        var element = document.getElementById('button-subs');
        if (this.subscribeVal) {
            element.style.backgroundColor = "rgb(230, 230, 230)";
            element.style.color = "rgb(100, 100, 100)";
        }
        else {
            element.style.backgroundColor = "red";
            element.style.color = "white";
        }
    };
    ChannelComponent.prototype.onSelect = function (x) {
        this.route.navigate(['/main/channel', this.userID, x]);
    };
    ChannelComponent.prototype.getUser = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getUser, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.userThumbnail = result.data.userById.thumbnail;
            _this.username = result.data.userById.username;
            _this.userSubscribers = result.data.userById.subscribers;
            _this.mutate();
        });
    };
    ChannelComponent.prototype.mutate = function () {
        var _this = this;
        this.apollo.mutate({
            mutation: exports.getChannel, variables: {
                userID: this.userID,
                location: "Indonesia",
                channelImage: this.userThumbnail
            }
        }).subscribe(function (result) {
            _this.channel = result.data['createChannel'];
            _this.getUserSubscribe();
        });
    };
    ChannelComponent.prototype.getUserSubscribe = function () {
        var _this = this;
        if (this.userIDFromLocal == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.mutateSubscribe, variables: {
                userID: this.userIDFromLocal,
                channelID: this.channel.channelID,
                channelUserID: this.userID
            }
        }).subscribe(function (result) {
            _this.subscribeVal = result.data['createUserSubscribe']['subscribe'];
            _this.changeColor();
        });
    };
    ChannelComponent.prototype.updateSubscribe = function () {
        var _this = this;
        if (this.userIDFromLocal == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.updateSubscribe, variables: {
                userID: this.userIDFromLocal,
                channelID: this.channel.channelID
            }
        }).subscribe(function (result) {
            _this.subscribeVal = result.data['updateUserSubscribe']['subscribe'];
            _this.apollo.mutate({
                mutation: exports.updateUserSubscribers, variables: {
                    userID: _this.userID,
                    bool: _this.subscribeVal
                }
            }).subscribe(function (result) {
                _this.userSubscribers = result.data['updateSubscribers']['subscribers'];
                _this.changeColor();
            });
        });
    };
    ChannelComponent = __decorate([
        core_1.Component({
            selector: 'app-channel',
            templateUrl: './channel.component.html',
            styleUrls: ['./channel.component.sass']
        })
    ], ChannelComponent);
    return ChannelComponent;
}());
exports.ChannelComponent = ChannelComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
