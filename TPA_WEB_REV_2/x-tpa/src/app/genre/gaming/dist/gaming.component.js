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
exports.GamingComponent = exports.getVideos = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getVideos = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getVideo($category: String!, $restriction: Boolean!, $premium: Boolean!){\n  videoByCategory(category: $category, restriction: $restriction, premium: $premium){\n    videoID\n    user{\n      id\n      username\n      thumbnail\n    }\n    views\n    title\n    thumbnail\n    day\n    month\n    year\n    descriptions\n    dislike\n    like\n    sourceLink\n  }\n}\n"], ["\nquery getVideo($category: String!, $restriction: Boolean!, $premium: Boolean!){\n  videoByCategory(category: $category, restriction: $restriction, premium: $premium){\n    videoID\n    user{\n      id\n      username\n      thumbnail\n    }\n    views\n    title\n    thumbnail\n    day\n    month\n    year\n    descriptions\n    dislike\n    like\n    sourceLink\n  }\n}\n"])));
var GamingComponent = /** @class */ (function () {
    function GamingComponent(apollo, router) {
        this.apollo = apollo;
        this.router = router;
    }
    GamingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.category = this.router.snapshot.paramMap.get('id');
        this.res = true;
        this.pre = false;
        if (localStorage.getItem('user') != null) {
            this.res = JSON.parse(localStorage.getItem("restriction"));
            this.pre = JSON.parse(localStorage.getItem("premium"));
        }
        this.apollo.watchQuery({
            query: exports.getVideos, variables: {
                category: this.category,
                restriction: this.res,
                premium: this.pre
            }
        }).valueChanges.subscribe(function (result) {
            _this.videos = result.data.videoByCategory;
        });
    };
    GamingComponent = __decorate([
        core_1.Component({
            selector: 'app-gaming',
            templateUrl: './gaming.component.html',
            styleUrls: ['./gaming.component.sass']
        })
    ], GamingComponent);
    return GamingComponent;
}());
exports.GamingComponent = GamingComponent;
var templateObject_1;
