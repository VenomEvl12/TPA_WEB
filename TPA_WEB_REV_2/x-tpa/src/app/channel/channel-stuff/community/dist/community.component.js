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
exports.CommunityComponent = exports.createCommunity = exports.getComment = exports.getChannel = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getChannel = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelID\n  }\n}\n"], ["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelID\n  }\n}\n"])));
exports.getComment = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery getComment($channelID: ID!){\n  channelCommunities(channelID: $channelID){\n    communityID\n    channelID\n\t\tcomDescription\n    like\n    dislike\n    day\n    month\n    year\n    user{\n      id\n      username\n      thumbnail\n    }\n  }\n}\n"], ["\nquery getComment($channelID: ID!){\n  channelCommunities(channelID: $channelID){\n    communityID\n    channelID\n\t\tcomDescription\n    like\n    dislike\n    day\n    month\n    year\n    user{\n      id\n      username\n      thumbnail\n    }\n  }\n}\n"])));
exports.createCommunity = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation createCommunity($channelID: ID!, $userID: ID!, $day: Int!, $month: Int!, $year: Int!, $comDescription: String!){\n  createChannelCommunities(input:{\n    channelID: $channelID\n    userID: $userID\n    day: $day\n    month: $month\n    year: $year\n    comDescription: $comDescription\n  }){\n    communityID\n  }\n}\n\n"], ["\nmutation createCommunity($channelID: ID!, $userID: ID!, $day: Int!, $month: Int!, $year: Int!, $comDescription: String!){\n  createChannelCommunities(input:{\n    channelID: $channelID\n    userID: $userID\n    day: $day\n    month: $month\n    year: $year\n    comDescription: $comDescription\n  }){\n    communityID\n  }\n}\n\n"])));
var CommunityComponent = /** @class */ (function () {
    function CommunityComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    CommunityComponent.prototype.ngOnInit = function () {
        this.userID = this.route.snapshot.parent.paramMap.get('id');
        this.localUserID = localStorage.getItem("userID");
        this.getChannelId();
    };
    CommunityComponent.prototype.getChannelId = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getChannel, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.channelID = result.data.getChannel.channelID;
            _this.apollo.watchQuery({
                query: exports.getComment, variables: {
                    channelID: _this.channelID
                }
            }).valueChanges.subscribe(function (result) {
                _this.comments = result.data.channelCommunities;
                _this.thumbnail = _this.comments[0].user.thumbnail;
            });
        });
    };
    CommunityComponent.prototype.createCommunity = function () {
        var element = document.getElementById('input-community');
        var val = element.value;
        var date = new Date();
        if (val != "") {
            this.apollo.mutate({
                mutation: exports.createCommunity, variables: {
                    channelID: this.channelID,
                    userID: this.userID,
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    comDescription: val
                }, refetchQueries: [{
                        query: exports.getComment, variables: {
                            channelID: this.channelID
                        }
                    }]
            }).subscribe(function (result) {
                alert("input comment success !");
            });
        }
    };
    CommunityComponent = __decorate([
        core_1.Component({
            selector: 'app-community',
            templateUrl: './community.component.html',
            styleUrls: ['./community.component.sass']
        })
    ], CommunityComponent);
    return CommunityComponent;
}());
exports.CommunityComponent = CommunityComponent;
var templateObject_1, templateObject_2, templateObject_3;
