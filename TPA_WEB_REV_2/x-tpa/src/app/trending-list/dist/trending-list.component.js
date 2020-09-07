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
exports.TrendingListComponent = exports.getVideoSort = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getVideoSort = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query getVideosSort($restriction: Boolean!, $premium: Boolean!){\n    videoByLocationSort(restriction: $restriction, premium: $premium){\n      videoID\n      user{\n        username\n        thumbnail\n      }\n      title\n      thumbnail\n      views\n      day\n      month\n      year\n      descriptions\n      sourceLink\n      videoLength\n    }\n  }\n"], ["\n  query getVideosSort($restriction: Boolean!, $premium: Boolean!){\n    videoByLocationSort(restriction: $restriction, premium: $premium){\n      videoID\n      user{\n        username\n        thumbnail\n      }\n      title\n      thumbnail\n      views\n      day\n      month\n      year\n      descriptions\n      sourceLink\n      videoLength\n    }\n  }\n"])));
var TrendingListComponent = /** @class */ (function () {
    function TrendingListComponent(router, apollo) {
        this.router = router;
        this.apollo = apollo;
    }
    TrendingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.res = true;
        this.pre = false;
        if (localStorage.getItem('user') != null) {
            this.res = JSON.parse(localStorage.getItem("restriction"));
            this.pre = JSON.parse(localStorage.getItem("premium"));
        }
        this.apollo.watchQuery({
            query: exports.getVideoSort, variables: {
                restriction: this.res,
                premium: this.pre
            }
        }).valueChanges.subscribe(function (result) {
            _this.videos = result.data.videoByLocationSort;
        });
    };
    TrendingListComponent.prototype.onSelect = function (str) {
        this.router.navigate(['/main/category', str]);
    };
    TrendingListComponent = __decorate([
        core_1.Component({
            selector: 'app-trending-list',
            templateUrl: './trending-list.component.html',
            styleUrls: ['./trending-list.component.sass']
        })
    ], TrendingListComponent);
    return TrendingListComponent;
}());
exports.TrendingListComponent = TrendingListComponent;
var templateObject_1;
