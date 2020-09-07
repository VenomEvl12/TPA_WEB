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
exports.PremiumNotUserComponent = exports.getVideos = exports.updatePremiumDay = exports.updatePremium = exports.getUser = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getUser = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery getUser($userID: ID!){\n  userById(id: $userID){\n    premium\n  }\n}\n"], ["\nquery getUser($userID: ID!){\n  userById(id: $userID){\n    premium\n  }\n}\n"])));
exports.updatePremium = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation updatePremium($userID: ID!, $premium: Boolean!){\n  updatePremium(id: $userID ,premium: $premium){\n    premium\n  }\n}\n"], ["\nmutation updatePremium($userID: ID!, $premium: Boolean!){\n  updatePremium(id: $userID ,premium: $premium){\n    premium\n  }\n}\n"])));
exports.updatePremiumDay = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation updatePremium($userID: ID!, $premiumDay: Int!){\n\tupdatePremiumCountDay(id: $userID, premiumDayCount: $premiumDay){\n    premium\n    premiumDayCount\n  }\n}\n"], ["\nmutation updatePremium($userID: ID!, $premiumDay: Int!){\n\tupdatePremiumCountDay(id: $userID, premiumDayCount: $premiumDay){\n    premium\n    premiumDayCount\n  }\n}\n"])));
exports.getVideos = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nquery getVideos{\n  premiumVideos{\n    videoID\n    user{\n      id\n      username\n      thumbnail\n    }\n    title\n    thumbnail\n    views\n    descriptions\n    sourceLink\n    videoLength\n    day\n    month\n    year\n  }\n}\n"], ["\nquery getVideos{\n  premiumVideos{\n    videoID\n    user{\n      id\n      username\n      thumbnail\n    }\n    title\n    thumbnail\n    views\n    descriptions\n    sourceLink\n    videoLength\n    day\n    month\n    year\n  }\n}\n"])));
var PremiumNotUserComponent = /** @class */ (function () {
    function PremiumNotUserComponent(apollo) {
        this.apollo = apollo;
    }
    PremiumNotUserComponent.prototype.ngOnInit = function () {
        this.userID = localStorage.getItem('userID');
        this.getUser();
    };
    PremiumNotUserComponent.prototype.getUser = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getUser, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.user = result.data.userById;
            _this.userPremium = _this.user.premium;
            _this.checkUser();
        });
    };
    PremiumNotUserComponent.prototype.checkUser = function () {
        if (this.userPremium) {
            this.getVideos();
        }
    };
    //--------------------------------------------------------------------------------
    PremiumNotUserComponent.prototype.upgradeToPremium = function () {
        var bool = confirm('Are you sure ?');
        if (bool) {
            this.upgradeUser();
        }
        else {
            alert('upgrade to premium failed !');
        }
    };
    PremiumNotUserComponent.prototype.upgradeUser = function () {
        var _this = this;
        this.apollo.mutate({
            mutation: exports.updatePremium, variables: {
                userID: this.userID,
                premium: true
            }
        }).subscribe(function (result) {
            _this.userPremium = result.data['updatePremium']['premium'];
            _this.updatePremiumDayCount();
        });
    };
    PremiumNotUserComponent.prototype.updatePremiumDayCount = function () {
        var element = document.getElementById('choose-plan');
        var selected = element.selectedIndex;
        var val = element.options[selected].value;
        this.apollo.mutate({
            mutation: exports.updatePremiumDay, variables: {
                userID: this.userID,
                premiumDay: val
            }
        }).subscribe(function (result) {
            alert('your account has been changed to premium !!');
            window.location.reload();
        });
    };
    PremiumNotUserComponent.prototype.getVideos = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getVideos
        }).valueChanges.subscribe(function (result) { _this.videos = result.data.premiumVideos; });
    };
    PremiumNotUserComponent = __decorate([
        core_1.Component({
            selector: 'app-premium-not-user',
            templateUrl: './premium-not-user.component.html',
            styleUrls: ['./premium-not-user.component.sass']
        })
    ], PremiumNotUserComponent);
    return PremiumNotUserComponent;
}());
exports.PremiumNotUserComponent = PremiumNotUserComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
