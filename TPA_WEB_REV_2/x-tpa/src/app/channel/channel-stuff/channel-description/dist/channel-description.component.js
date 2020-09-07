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
exports.ChannelDescriptionComponent = exports.updateDescription = exports.getChannel = exports.getUser = exports.getViews = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getViews = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery totalViews($userID: ID!){\n  videoTotalViews(userID: $userID)\n}\n"], ["\nquery totalViews($userID: ID!){\n  videoTotalViews(userID: $userID)\n}\n"])));
exports.getUser = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery getUser($id: ID!){\n  userById(id: $id){\n    date\n  }\n}\n"], ["\nquery getUser($id: ID!){\n  userById(id: $id){\n    date\n  }\n}\n"])));
exports.getChannel = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelID\n    channelDescription\n    location\n  }\n}\n"], ["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelID\n    channelDescription\n    location\n  }\n}\n"])));
exports.updateDescription = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation updateDescription($channelID: ID!, $description: String!){\n  updateChannelDescription(channelID: $channelID, description: $description){\n    channelDescription\n  }\n}\n"], ["\nmutation updateDescription($channelID: ID!, $description: String!){\n  updateChannelDescription(channelID: $channelID, description: $description){\n    channelDescription\n  }\n}\n"])));
var ChannelDescriptionComponent = /** @class */ (function () {
    function ChannelDescriptionComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    ChannelDescriptionComponent.prototype.ngOnInit = function () {
        this.userID = this.route.snapshot.parent.paramMap.get('id');
        this.userIDlocal = localStorage.getItem('userID');
        this.showEdit = false;
        this.getTotalViews();
        this.getDate();
        this.getChannel();
    };
    ChannelDescriptionComponent.prototype.getTotalViews = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getViews, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.totalViews = result.data.videoTotalViews;
        });
    };
    ChannelDescriptionComponent.prototype.getDate = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getUser, variables: {
                id: this.userID
            }
        }).valueChanges.subscribe(function (result) { _this.joinDate = result.data.userById.date; });
    };
    ChannelDescriptionComponent.prototype.getChannel = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getChannel, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.channel = result.data.getChannel;
            _this.description = _this.channel.channelDescription;
        });
    };
    ChannelDescriptionComponent.prototype.updateDescription = function () {
        var _this = this;
        var channelDesc = document.getElementById("inputDesc").value;
        this.apollo.mutate({
            mutation: exports.updateDescription, variables: {
                channelID: this.channel.channelID,
                description: channelDesc
            }
        }).subscribe(function (result) {
            _this.description = result.data['updateChannelDescription']['channelDescription'];
            alert('update success !!');
            _this.showEdit = false;
        });
    };
    ChannelDescriptionComponent.prototype.hideDescription = function () {
        console.log(this.showEdit);
        if (this.showEdit == false) {
            this.showEdit = true;
        }
        else {
            this.showEdit = false;
        }
    };
    ChannelDescriptionComponent = __decorate([
        core_1.Component({
            selector: 'app-channel-description',
            templateUrl: './channel-description.component.html',
            styleUrls: ['./channel-description.component.sass']
        })
    ], ChannelDescriptionComponent);
    return ChannelDescriptionComponent;
}());
exports.ChannelDescriptionComponent = ChannelDescriptionComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
