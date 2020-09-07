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
exports.SearchPageComponent = exports.retrieveVideo = exports.retrieveUser = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.retrieveUser = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getChannel($keyword: String!){\n  getUserByKeyword(keyword: $keyword){\n    id\n    username\n    subscribers\n    thumbnail\n    \n  }\n}\n"], ["\nquery getChannel($keyword: String!){\n  getUserByKeyword(keyword: $keyword){\n    id\n    username\n    subscribers\n    thumbnail\n    \n  }\n}\n"])));
exports.retrieveVideo = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nquery getChannel($keyword: String!){\n  getVideoByKeyword(keyword: $keyword){\n    videoID\n    user{\n      username\n      thumbnail\n      subscribers\n    }\n    title\n    thumbnail\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n    videoLength\n  \t}\n}\n"], ["\nquery getChannel($keyword: String!){\n  getVideoByKeyword(keyword: $keyword){\n    videoID\n    user{\n      username\n      thumbnail\n      subscribers\n    }\n    title\n    thumbnail\n    views\n    day\n    month\n    year\n    descriptions\n    sourceLink\n    videoLength\n  \t}\n}\n"])));
var SearchPageComponent = /** @class */ (function () {
    function SearchPageComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    SearchPageComponent.prototype.ngOnInit = function () {
        this.keyword = this.route.snapshot.paramMap.get('id');
        this.getUser();
        this.getVideos();
    };
    SearchPageComponent.prototype.getUser = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrieveUser, variables: {
                keyword: this.keyword
            }
        }).valueChanges.subscribe(function (result) {
            _this.users = result.data.getUserByKeyword;
        });
    };
    SearchPageComponent.prototype.getVideos = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrieveVideo, variables: {
                keyword: this.keyword
            }
        }).valueChanges.subscribe(function (result) {
            _this.videos = result.data.getVideoByKeyword;
        });
    };
    SearchPageComponent = __decorate([
        core_1.Component({
            selector: 'app-search-page',
            templateUrl: './search-page.component.html',
            styleUrls: ['./search-page.component.sass']
        })
    ], SearchPageComponent);
    return SearchPageComponent;
}());
exports.SearchPageComponent = SearchPageComponent;
var templateObject_1, templateObject_2;
