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
exports.HomeNotUserComponent = exports.getAVideos = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getAVideos = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query getVideos($location: String!, $restriction: Boolean!, $premium : Boolean!){\n    videoByLocation(location: $location, restriction: $restriction, premium: $premium){\n      videoID\n      user{\n        id\n        username\n        thumbnail\n        premium\n      }\n      title\n      thumbnail\n      views\n      descriptions\n      sourceLink\n      videoLength\n      day\n      month\n      year\n    }\n  }\n"], ["\n  query getVideos($location: String!, $restriction: Boolean!, $premium : Boolean!){\n    videoByLocation(location: $location, restriction: $restriction, premium: $premium){\n      videoID\n      user{\n        id\n        username\n        thumbnail\n        premium\n      }\n      title\n      thumbnail\n      views\n      descriptions\n      sourceLink\n      videoLength\n      day\n      month\n      year\n    }\n  }\n"])));
var HomeNotUserComponent = /** @class */ (function () {
    function HomeNotUserComponent(apollo) {
        this.apollo = apollo;
        this.lastKey = 0;
    }
    HomeNotUserComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.restrictMode = JSON.parse(localStorage.getItem('restriction'));
        this.premium = JSON.parse(localStorage.getItem('premium'));
        this.loca = localStorage.getItem('location');
        if (this.user == null) {
            this.restrictMode = true;
            this.loca = "Jepang";
            this.premium = false;
        }
        this.lastKey = 12;
        this.getAllVideos();
    };
    HomeNotUserComponent.prototype.getAllVideos = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getAVideos, variables: {
                location: this.loca,
                restriction: this.restrictMode,
                premium: this.premium
            }
        }).valueChanges.subscribe(function (result) {
            _this.videos = result.data.videoByLocation;
            _this.obServer = new IntersectionObserver(function (entry) {
                if (entry[0].isIntersecting) {
                    var card = document.querySelector(".cardst");
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
            _this.obServer.observe(document.querySelector('.footer'));
        });
    };
    HomeNotUserComponent = __decorate([
        core_1.Component({
            selector: 'app-home-not-user',
            templateUrl: './home-not-user.component.html',
            styleUrls: ['./home-not-user.component.sass']
        })
    ], HomeNotUserComponent);
    return HomeNotUserComponent;
}());
exports.HomeNotUserComponent = HomeNotUserComponent;
var templateObject_1;
