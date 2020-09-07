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
exports.VideoReplyComponent = exports.updateReplyDislike = exports.updateReplyLike = exports.updateReplyDislikeVal = exports.updateReplyLikeVal = exports.getreplyLikeVal = exports.createReplyReplies = exports.getVideo = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.getVideo = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query test2($video_id: ID!) {\n    Videos(videoID: $video_id){\n      videoID\n      sourceLink\n      title\n      views\n      day\n      month\n      year\n      like\n      dislike\n      descriptions\n      user{\n      \tid\n        thumbnail\n        subscribers\n        username\n      }\n  \tvideoReply{\n      user{\n        id\n        thumbnail\n        username\n      }\n      videoID\n      replyID\n      likes\n      day\n      month\n      year\n      dislikes\n      description\n      replyReplies{\n        videoID\n        replyRepliesID\n        replyID\n        day\n        month\n        year\n        user{\n          id\n          username\n          thumbnail\n        }\n        like\n        dislike\n        description\n      }\n    \t}\n    }\n  }\n"], ["\n  query test2($video_id: ID!) {\n    Videos(videoID: $video_id){\n      videoID\n      sourceLink\n      title\n      views\n      day\n      month\n      year\n      like\n      dislike\n      descriptions\n      user{\n      \tid\n        thumbnail\n        subscribers\n        username\n      }\n  \tvideoReply{\n      user{\n        id\n        thumbnail\n        username\n      }\n      videoID\n      replyID\n      likes\n      day\n      month\n      year\n      dislikes\n      description\n      replyReplies{\n        videoID\n        replyRepliesID\n        replyID\n        day\n        month\n        year\n        user{\n          id\n          username\n          thumbnail\n        }\n        like\n        dislike\n        description\n      }\n    \t}\n    }\n  }\n"])));
exports.createReplyReplies = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation createReplyReplies($replyID: ID!, $userID: ID!, $day: Int!, $month: Int!, $year: Int!, $description: String!){\n  createReplyReplies(input:{\n    replyID: $replyID\n    userID: $userID\n    day: $day\n    month: $month\n    year: $year\n    description: $description\n  }){\n    replyRepliesID\n  }\n}\n"], ["\nmutation createReplyReplies($replyID: ID!, $userID: ID!, $day: Int!, $month: Int!, $year: Int!, $description: String!){\n  createReplyReplies(input:{\n    replyID: $replyID\n    userID: $userID\n    day: $day\n    month: $month\n    year: $year\n    description: $description\n  }){\n    replyRepliesID\n  }\n}\n"])));
exports.getreplyLikeVal = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation getReplyLikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){\n  createNewVideoReplyLikeVali(input:{\n    userID: $userID\n    videoID: $videoID\n    replyID: $replyID \n  }){\n    userID\n    videoID\n    replyID\n    like\n    dislike\n  }\n}\n"], ["\nmutation getReplyLikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){\n  createNewVideoReplyLikeVali(input:{\n    userID: $userID\n    videoID: $videoID\n    replyID: $replyID \n  }){\n    userID\n    videoID\n    replyID\n    like\n    dislike\n  }\n}\n"])));
exports.updateReplyLikeVal = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation updateReplyLikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){\n  updateVideoReplyLikeVali(userID: $userID, videoID: $videoID, replyID: $replyID){\n    userID\n    videoID\n    replyID\n    like\n    dislike\n  }\n}\n"], ["\nmutation updateReplyLikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){\n  updateVideoReplyLikeVali(userID: $userID, videoID: $videoID, replyID: $replyID){\n    userID\n    videoID\n    replyID\n    like\n    dislike\n  }\n}\n"])));
exports.updateReplyDislikeVal = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nmutation updateReplyDislikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){\n  updateVideoReplyDislikeVali(userID: $userID, videoID: $videoID, replyID: $replyID){\n    userID\n    videoID\n    replyID\n    like\n    dislike\n  }\n}\n"], ["\nmutation updateReplyDislikeVal($userID: ID!, $videoID: ID!, $replyID: ID!){\n  updateVideoReplyDislikeVali(userID: $userID, videoID: $videoID, replyID: $replyID){\n    userID\n    videoID\n    replyID\n    like\n    dislike\n  }\n}\n"])));
exports.updateReplyLike = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\nmutation updateLike($replyID: ID!, $like: Boolean!){\n\tupdateReplyLikes(replyID: $replyID, like: $like){\n    likes\n    dislikes\n  }\n}\n"], ["\nmutation updateLike($replyID: ID!, $like: Boolean!){\n\tupdateReplyLikes(replyID: $replyID, like: $like){\n    likes\n    dislikes\n  }\n}\n"])));
exports.updateReplyDislike = graphql_tag_1["default"](templateObject_7 || (templateObject_7 = __makeTemplateObject(["\nmutation updateDislike($replyID: ID!, $dislike: Boolean!){\n\tupdateReplyDislikes(replyID: $replyID, dislike: $dislike){\n    likes\n    dislikes\n  }\n}\n"], ["\nmutation updateDislike($replyID: ID!, $dislike: Boolean!){\n\tupdateReplyDislikes(replyID: $replyID, dislike: $dislike){\n    likes\n    dislikes\n  }\n}\n"])));
var VideoReplyComponent = /** @class */ (function () {
    function VideoReplyComponent(apollo, route) {
        this.apollo = apollo;
        this.route = route;
    }
    VideoReplyComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.replyShow = false;
        this.replyRepliesShow = false;
        this.videoID = parseInt(this.route.snapshot.paramMap.get('id'));
        this.thumbnail = this.user.photoUrl;
        this.userID = localStorage.getItem('userID');
        var time = new Date();
        this.month = (time.getMonth() + 1) - this.comment.month;
        this.replyID = this.comment.replyID;
        this.replyReplies = this.comment.replyReplies;
        this.totalreplyReplies = this.replyReplies.length;
        this.like = this.comment.likes;
        this.dislike = this.comment.dislikes;
        this.getReplyVal();
    };
    VideoReplyComponent.prototype.showReply = function () {
        if (this.replyRepliesShow == false) {
            this.replyRepliesShow = true;
        }
        else {
            this.replyRepliesShow = false;
        }
    };
    VideoReplyComponent.prototype.hide = function () {
        if (this.replyShow == false) {
            this.replyShow = true;
        }
        else {
            this.replyShow = false;
        }
    };
    VideoReplyComponent.prototype.createReplyReplies = function () {
        var date = new Date();
        if (this.komen != "") {
            this.apollo.mutate({
                mutation: exports.createReplyReplies, variables: {
                    userID: this.userID,
                    replyID: this.replyID,
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    description: this.komen
                }, refetchQueries: [{
                        query: exports.getVideo,
                        variables: {
                            video_id: this.videoID
                        }
                    }]
            }).subscribe(function (result) { return alert('success input reply'); });
        }
    };
    VideoReplyComponent.prototype.getReplyVal = function () {
        var _this = this;
        if (this.user == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.getreplyLikeVal, variables: {
                userID: this.userID,
                videoID: this.videoID,
                replyID: this.replyID
            }
        }).subscribe(function (result) {
            _this.replyVal = result.data['createNewVideoReplyLikeVali'];
        });
    };
    VideoReplyComponent.prototype.updateLikeVal = function () {
        var _this = this;
        if (this.user == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.updateReplyLikeVal, variables: {
                userID: this.userID,
                videoID: this.videoID,
                replyID: this.replyID
            }
        }).subscribe(function (result) {
            _this.replyVal = result.data['updateVideoReplyLikeVali'];
            _this.apollo.mutate({
                mutation: exports.updateReplyLike, variables: {
                    replyID: _this.replyID,
                    like: _this.replyVal.like
                }
            }).subscribe(function (result) {
                _this.like = result.data['updateReplyLikes']['likes'];
            });
        });
    };
    VideoReplyComponent.prototype.updateDislikeVal = function () {
        var _this = this;
        if (this.user == null) {
            return;
        }
        console.log(this.replyID, this.userID, this.videoID);
        this.apollo.mutate({
            mutation: exports.updateReplyDislikeVal, variables: {
                userID: this.userID,
                videoID: this.videoID,
                replyID: this.replyID
            }
        }).subscribe(function (result) {
            _this.replyVal = result.data['updateVideoReplyDislikeVali'];
            _this.apollo.mutate({
                mutation: exports.updateReplyDislike, variables: {
                    replyID: _this.replyID,
                    dislike: _this.replyVal.dislike
                }
            }).subscribe(function (result) {
                _this.dislike = result.data['updateReplyDislikes']['dislikes'];
            });
        });
    };
    __decorate([
        core_1.Input("comment")
    ], VideoReplyComponent.prototype, "comment");
    VideoReplyComponent = __decorate([
        core_1.Component({
            selector: 'app-video-reply',
            templateUrl: './video-reply.component.html',
            styleUrls: ['./video-reply.component.sass']
        })
    ], VideoReplyComponent);
    return VideoReplyComponent;
}());
exports.VideoReplyComponent = VideoReplyComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
