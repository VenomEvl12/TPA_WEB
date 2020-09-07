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
exports.CommunityCommentComponent = exports.getComments = exports.deleteComment = exports.updateDislike = exports.updateLike = exports.updateDislikeVal = exports.updateLikeVal = exports.mutateLikeVal = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
exports.mutateLikeVal = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nmutation createCommunityVal($userID: ID!, $communityID: ID!){\n  createChannelCommunityVali(input:{\n    userID: $userID\n    CommunityID: $communityID\n  }){\n    CommunityValiID\n  }\n}\n"], ["\nmutation createCommunityVal($userID: ID!, $communityID: ID!){\n  createChannelCommunityVali(input:{\n    userID: $userID\n    CommunityID: $communityID\n  }){\n    CommunityValiID\n  }\n}\n"])));
exports.updateLikeVal = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation updateLike($comValID: ID!){\n  updateChannelCommunityValiLike(communityValiID: $comValID){\n    like\n    dislike\n  }\n}\n"], ["\nmutation updateLike($comValID: ID!){\n  updateChannelCommunityValiLike(communityValiID: $comValID){\n    like\n    dislike\n  }\n}\n"])));
exports.updateDislikeVal = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nmutation updateLike($comValID: ID!){\n  updateChannelCommunityValiDislike(communityValiID: $comValID){\n    like\n    dislike\n  }\n}\n"], ["\nmutation updateLike($comValID: ID!){\n  updateChannelCommunityValiDislike(communityValiID: $comValID){\n    like\n    dislike\n  }\n}\n"])));
exports.updateLike = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation updateLike($communityID: ID!, $like: Boolean!){\n  updateChannelCommunitiesLike(communityID: $communityID, like: $like){\n    like\n  }\n}\n"], ["\nmutation updateLike($communityID: ID!, $like: Boolean!){\n  updateChannelCommunitiesLike(communityID: $communityID, like: $like){\n    like\n  }\n}\n"])));
exports.updateDislike = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nmutation updateDisike($communityID: ID!, $dislike: Boolean!){\n  updateChannelCommunitiesDislike(communityID: $communityID, dislike: $dislike){\n    dislike\n  }\n}\n"], ["\nmutation updateDisike($communityID: ID!, $dislike: Boolean!){\n  updateChannelCommunitiesDislike(communityID: $communityID, dislike: $dislike){\n    dislike\n  }\n}\n"])));
exports.deleteComment = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\nmutation deleteCommunity($communityID: ID!){\n  deleteChannelCommunities(communityID: $communityID)\n}\n"], ["\nmutation deleteCommunity($communityID: ID!){\n  deleteChannelCommunities(communityID: $communityID)\n}\n"])));
exports.getComments = graphql_tag_1["default"](templateObject_7 || (templateObject_7 = __makeTemplateObject(["\nquery getComment($channelID: ID!){\n  channelCommunities(channelID: $channelID){\n    communityID\n    channelID\n\t\tcomDescription\n    like\n    dislike\n    day\n    month\n    year\n    user{\n      id\n      username\n      thumbnail\n    }\n  }\n}\n\n"], ["\nquery getComment($channelID: ID!){\n  channelCommunities(channelID: $channelID){\n    communityID\n    channelID\n\t\tcomDescription\n    like\n    dislike\n    day\n    month\n    year\n    user{\n      id\n      username\n      thumbnail\n    }\n  }\n}\n\n"])));
var CommunityCommentComponent = /** @class */ (function () {
    function CommunityCommentComponent(apollo) {
        this.apollo = apollo;
    }
    CommunityCommentComponent.prototype.ngOnInit = function () {
        this.hideB = false;
        this.userID = this.comment.user.id;
        this.localUserID = localStorage.getItem('userID');
        this.like = this.comment.like;
        this.dislike = this.comment.dislike;
        this.getlikeVal();
    };
    CommunityCommentComponent.prototype.hide = function () {
        if (this.hideB == false) {
            this.hideB = true;
        }
        else {
            this.hideB = false;
        }
    };
    CommunityCommentComponent.prototype.getlikeVal = function () {
        var _this = this;
        if (this.localUserID == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.mutateLikeVal, variables: {
                userID: this.localUserID,
                communityID: this.comment.communityID
            }
        }).subscribe(function (result) {
            _this.likeVal = result.data['createChannelCommunityVali'];
        });
    };
    CommunityCommentComponent.prototype.updateLike = function () {
        var _this = this;
        if (this.localUserID == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.updateLikeVal, variables: {
                comValID: this.likeVal.CommunityValiID
            }
        }).subscribe(function (result) {
            var likeValidation = result.data['updateChannelCommunityValiLike']['like'];
            console.log(likeValidation);
            _this.apollo.mutate({
                mutation: exports.updateLike, variables: {
                    communityID: _this.comment.communityID,
                    like: likeValidation
                }
            }).subscribe(function (result) {
                _this.like = result.data['updateChannelCommunitiesLike']['like'];
            });
        });
    };
    CommunityCommentComponent.prototype.updateDislike = function () {
        var _this = this;
        if (this.localUserID == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.updateDislikeVal, variables: {
                comValID: this.likeVal.CommunityValiID
            }
        }).subscribe(function (result) {
            var likeValidation = result.data['updateChannelCommunityValiDislike']['dislike'];
            _this.apollo.mutate({
                mutation: exports.updateDislike, variables: {
                    communityID: _this.comment.communityID,
                    dislike: likeValidation
                }
            }).subscribe(function (result) {
                _this.dislike = result.data['updateChannelCommunitiesDislike']['dislike'];
            });
        });
    };
    CommunityCommentComponent.prototype.deleteCommunity = function () {
        this.apollo.mutate({
            mutation: exports.deleteComment, variables: {
                communityID: this.comment.communityID
            }, refetchQueries: [{
                    query: exports.getComments, variables: {
                        channelID: this.comment.channelID
                    }
                }]
        }).subscribe(function (result) { alert("success delete !"); });
    };
    __decorate([
        core_1.Input('comment')
    ], CommunityCommentComponent.prototype, "comment");
    CommunityCommentComponent = __decorate([
        core_1.Component({
            selector: 'app-community-comment',
            templateUrl: './community-comment.component.html',
            styleUrls: ['./community-comment.component.sass']
        })
    ], CommunityCommentComponent);
    return CommunityCommentComponent;
}());
exports.CommunityCommentComponent = CommunityCommentComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
