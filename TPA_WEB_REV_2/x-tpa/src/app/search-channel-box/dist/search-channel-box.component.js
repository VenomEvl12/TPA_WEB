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
exports.SearchChannelBoxComponent = exports.retrieveChannel = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.retrieveChannel = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelDescription\n    videos{\n      views\n    }\n  }\n}\n"], ["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelDescription\n    videos{\n      views\n    }\n  }\n}\n"])));
var SearchChannelBoxComponent = /** @class */ (function () {
    function SearchChannelBoxComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    SearchChannelBoxComponent.prototype.ngOnInit = function () {
        this.getChannel();
    };
    SearchChannelBoxComponent.prototype.getChannel = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrieveChannel, variables: {
                userID: this.user.id
            }
        }).valueChanges.subscribe(function (result) {
            _this.channel = result.data.getChannel;
            _this.totalVideos = _this.channel.videos.length;
        });
    };
    SearchChannelBoxComponent.prototype.navigate = function () {
        this.route.navigate(['/main/channel/', this.user.id, 'home']);
    };
    __decorate([
        core_1.Input('user')
    ], SearchChannelBoxComponent.prototype, "user");
    SearchChannelBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-search-channel-box',
            templateUrl: './search-channel-box.component.html',
            styleUrls: ['./search-channel-box.component.sass']
        })
    ], SearchChannelBoxComponent);
    return SearchChannelBoxComponent;
}());
exports.SearchChannelBoxComponent = SearchChannelBoxComponent;
var templateObject_1;
