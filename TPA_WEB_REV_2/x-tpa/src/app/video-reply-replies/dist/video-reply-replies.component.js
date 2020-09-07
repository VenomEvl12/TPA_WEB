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
exports.VideoReplyRepliesComponent = exports.updateDislike = exports.updateLike = exports.updateDislikeVal = exports.updateLikeVal = exports.getVal = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var generateMonth_1 = require("../generateMonth");
exports.getVal = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation getVal($userID: ID!, $replyID: ID!, $videoID: ID!, $replyRepliesID: ID!){\n  createNewVideoReplyRepliesLikeVali(input:{\n    userID: $userID\n    replyID: $replyID\n    videoID: $videoID\n    replyRepliesID: $replyRepliesID\n  }){\n    videoReplyRepliesLikeValiID\n    userID\n    replyID\n    videoID\n    like\n    dislike\n  }\n}\n"], ["\nmutation getVal($userID: ID!, $replyID: ID!, $videoID: ID!, $replyRepliesID: ID!){\n  createNewVideoReplyRepliesLikeVali(input:{\n    userID: $userID\n    replyID: $replyID\n    videoID: $videoID\n    replyRepliesID: $replyRepliesID\n  }){\n    videoReplyRepliesLikeValiID\n    userID\n    replyID\n    videoID\n    like\n    dislike\n  }\n}\n"])));
exports.updateLikeVal = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation updateLikeVal($replyReplies: ID!, $userID: ID!, $videoID: ID!, $replyID: ID!, $replyRepliesID: ID!){\n  updateVideReplyRepliesLikeVali(videoReplyRepliesLikeValiID: $replyReplies, userID: $userID, videoID: $videoID, replyID: $replyID, replyRepliesID: $replyRepliesID){\n    videoReplyRepliesLikeValiID\n    userID\n    replyID\n    videoID\n    replyRepliesID\n    like\n\t\tdislike\n  }\n}\n"], ["\nmutation updateLikeVal($replyReplies: ID!, $userID: ID!, $videoID: ID!, $replyID: ID!, $replyRepliesID: ID!){\n  updateVideReplyRepliesLikeVali(videoReplyRepliesLikeValiID: $replyReplies, userID: $userID, videoID: $videoID, replyID: $replyID, replyRepliesID: $replyRepliesID){\n    videoReplyRepliesLikeValiID\n    userID\n    replyID\n    videoID\n    replyRepliesID\n    like\n\t\tdislike\n  }\n}\n"])));
exports.updateDislikeVal = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation updateLikeVal($replyReplies: ID!, $userID: ID!, $videoID: ID!, $replyID: ID!, $replyRepliesID: ID!){\n  updateVideoReplyRepliesDislikeVali(videoReplyRepliesLikeValiID: $replyReplies, userID: $userID, videoID: $videoID, replyID: $replyID, replyRepliesID: $replyRepliesID){\n    videoReplyRepliesLikeValiID\n    userID\n    replyID\n    videoID\n    like\n\t\tdislike\n  }\n}\n"], ["\nmutation updateLikeVal($replyReplies: ID!, $userID: ID!, $videoID: ID!, $replyID: ID!, $replyRepliesID: ID!){\n  updateVideoReplyRepliesDislikeVali(videoReplyRepliesLikeValiID: $replyReplies, userID: $userID, videoID: $videoID, replyID: $replyID, replyRepliesID: $replyRepliesID){\n    videoReplyRepliesLikeValiID\n    userID\n    replyID\n    videoID\n    like\n\t\tdislike\n  }\n}\n"])));
exports.updateLike = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation updateLike($replyReplies: ID!, $like: Boolean!){\n  updateReplyRepliesLikes(replyRepliesID: $replyReplies, like: $like){\n    like\n    dislike\n  }\n}\n"], ["\nmutation updateLike($replyReplies: ID!, $like: Boolean!){\n  updateReplyRepliesLikes(replyRepliesID: $replyReplies, like: $like){\n    like\n    dislike\n  }\n}\n"])));
exports.updateDislike = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nmutation updateLike($replyReplies: ID!, $dislike: Boolean!){\n  updateReplyRepliesDislikes(replyRepliesID: $replyReplies, dislike: $dislike){\n    like\n    dislike\n  }\n}\n"], ["\nmutation updateLike($replyReplies: ID!, $dislike: Boolean!){\n  updateReplyRepliesDislikes(replyRepliesID: $replyReplies, dislike: $dislike){\n    like\n    dislike\n  }\n}\n"])));
var VideoReplyRepliesComponent = /** @class */ (function () {
    function VideoReplyRepliesComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    VideoReplyRepliesComponent.prototype.ngOnInit = function () {
        this.initialization();
        this.generateMonth();
        this.getValidation();
    };
    VideoReplyRepliesComponent.prototype.initialization = function () {
        this.videoID = parseInt(this.route.snapshot.paramMap.get('id'));
        this.userID = localStorage.getItem('userID');
        this.replyID = this.replies.replyID;
        this.replyRepliesID = this.replies.replyRepliesID;
        this.like = this.replies.like;
        this.dislike = this.replies.dislike;
    };
    VideoReplyRepliesComponent.prototype.generateMonth = function () {
        var monthCreate = new generateMonth_1.MonthCreator();
        this.month = monthCreate.createMonth(this.replies.month);
    };
    VideoReplyRepliesComponent.prototype.getValidation = function () {
        var _this = this;
        if (this.userID == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.getVal, variables: {
                userID: this.userID,
                videoID: this.videoID,
                replyID: this.replyID,
                replyRepliesID: this.replyRepliesID
            }
        }).subscribe(function (result) {
            _this.replyReplies = result.data['createNewVideoReplyRepliesLikeVali'];
        });
    };
    VideoReplyRepliesComponent.prototype.updateLike = function () {
        var _this = this;
        if (this.userID == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.updateLikeVal, variables: {
                replyReplies: this.replyReplies.videoReplyRepliesLikeValiID,
                videoID: this.videoID,
                userID: this.userID,
                replyID: this.replyID,
                replyRepliesID: this.replyRepliesID
            }
        }).subscribe(function (result) {
            _this.likeVal = result.data['updateVideReplyRepliesLikeVali'];
            _this.apollo.mutate({
                mutation: exports.updateLike, variables: {
                    replyReplies: _this.replies.replyRepliesID,
                    like: _this.likeVal.like
                }
            }).subscribe(function (result) {
                _this.like = result.data['updateReplyRepliesLikes']['like'];
            });
        });
    };
    VideoReplyRepliesComponent.prototype.updateDislike = function () {
        var _this = this;
        if (this.userID == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.updateDislikeVal, variables: {
                replyReplies: this.replyReplies.videoReplyRepliesLikeValiID,
                videoID: this.videoID,
                userID: this.userID,
                replyID: this.replyID,
                replyRepliesID: this.replyRepliesID
            }
        }).subscribe(function (result) {
            _this.likeVal = result.data['updateVideoReplyRepliesDislikeVali'];
            _this.apollo.mutate({
                mutation: exports.updateDislike, variables: {
                    replyReplies: _this.replies.replyRepliesID,
                    dislike: _this.likeVal.dislike
                }
            }).subscribe(function (result) {
                _this.dislike = result.data['updateReplyRepliesDislikes']['dislike'];
            });
        });
    };
    __decorate([
        core_1.Input("replies")
    ], VideoReplyRepliesComponent.prototype, "replies");
    VideoReplyRepliesComponent = __decorate([
        core_1.Component({
            selector: 'app-video-reply-replies',
            templateUrl: './video-reply-replies.component.html',
            styleUrls: ['./video-reply-replies.component.sass']
        })
    ], VideoReplyRepliesComponent);
    return VideoReplyRepliesComponent;
}());
exports.VideoReplyRepliesComponent = VideoReplyRepliesComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
