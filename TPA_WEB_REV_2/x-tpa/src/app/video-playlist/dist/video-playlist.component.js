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
exports.VideoPlaylistComponent = exports.updateType = exports.updateTitle = exports.updateDescription = exports.updatePriority = exports.retrieveUser = exports.retrieveVideo = exports.retrieveVideoPlaylist = exports.updateViews = exports.retrievePlaylist = void 0;
var core_1 = require("@angular/core");
var apollo_angular_1 = require("apollo-angular");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var channel_component_1 = require("../channel/channel.component");
var video_play_component_1 = require("../video-play/video-play.component");
exports.retrievePlaylist = apollo_angular_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery retrievePlaylist($playlistID: ID!){\n  playlist(playlistID: $playlistID){\n    playlistID\n    userID\n    videoID\n    playlistHeader\n    playlistType\n    description\n    views\n    totalVideo\n  }\n}\n"], ["\nquery retrievePlaylist($playlistID: ID!){\n  playlist(playlistID: $playlistID){\n    playlistID\n    userID\n    videoID\n    playlistHeader\n    playlistType\n    description\n    views\n    totalVideo\n  }\n}\n"])));
exports.updateViews = apollo_angular_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation updateViews($playlistID: ID!, $userID: ID!){\n  updatePlayListViews(playlistID: $playlistID, userID: $userID){\n    views\n  }\n}\n"], ["\nmutation updateViews($playlistID: ID!, $userID: ID!){\n  updatePlayListViews(playlistID: $playlistID, userID: $userID){\n    views\n  }\n}\n"])));
exports.retrieveVideoPlaylist = apollo_angular_1.gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nquery retrievePlaylistVideos($playlistID: ID!){\n  playlistListVideos(playlistID: $playlistID){\n    playlistID\n    userID\n    videoID\n    playlistHeader\n    playlistType\n    views\n    description\n    datePublish\n    views\n    dateAddToPlaylist\n  }\n}\n"], ["\nquery retrievePlaylistVideos($playlistID: ID!){\n  playlistListVideos(playlistID: $playlistID){\n    playlistID\n    userID\n    videoID\n    playlistHeader\n    playlistType\n    views\n    description\n    datePublish\n    views\n    dateAddToPlaylist\n  }\n}\n"])));
exports.retrieveVideo = apollo_angular_1.gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nquery retrieveVideo($videoID: ID!){\n  Videos(videoID: $videoID){\n    thumbnail\n  }\n}\n"], ["\nquery retrieveVideo($videoID: ID!){\n  Videos(videoID: $videoID){\n    thumbnail\n  }\n}\n"])));
exports.retrieveUser = apollo_angular_1.gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nquery retrieveUser($userID: ID!){\n  userById(id: $userID){\n    username\n    id\n    subscribers\n    thumbnail\n  }\n}\n"], ["\nquery retrieveUser($userID: ID!){\n  userById(id: $userID){\n    username\n    id\n    subscribers\n    thumbnail\n  }\n}\n"])));
exports.updatePriority = apollo_angular_1.gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\nmutation updatePriority($playlistID: ID!, $userID: ID!, $videoID: ID!, $prio: Int!){\n  updatePriorityWeight(playlistID: $playlistID, userID: $userID, videoID: $videoID, priorityWeight: $prio){\n    playlistID\n    priorityWeight\n  }\n}\n"], ["\nmutation updatePriority($playlistID: ID!, $userID: ID!, $videoID: ID!, $prio: Int!){\n  updatePriorityWeight(playlistID: $playlistID, userID: $userID, videoID: $videoID, priorityWeight: $prio){\n    playlistID\n    priorityWeight\n  }\n}\n"])));
exports.updateDescription = apollo_angular_1.gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\nmutation updateDesc($playlistID: ID!, $userID: ID!, $desc: String!){\n  updatePlayListDescription(playlistID: $playlistID, userID: $userID, description: $desc){\n    description\n  }\n}\n"], ["\nmutation updateDesc($playlistID: ID!, $userID: ID!, $desc: String!){\n  updatePlayListDescription(playlistID: $playlistID, userID: $userID, description: $desc){\n    description\n  }\n}\n"])));
exports.updateTitle = apollo_angular_1.gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\nmutation updateHeader($playlistID: ID!, $userID: ID!, $title: String!){\n  updatePlayListHeader(playlistID: $playlistID, userID: $userID, header: $title){\n    playlistHeader\n  }\n}\n"], ["\nmutation updateHeader($playlistID: ID!, $userID: ID!, $title: String!){\n  updatePlayListHeader(playlistID: $playlistID, userID: $userID, header: $title){\n    playlistHeader\n  }\n}\n"])));
exports.updateType = apollo_angular_1.gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\nmutation test($playlistID: ID!, $userID: ID!, $type: Boolean!){\n  updatePlaylistType(playlistID: $playlistID, userID: $userID, tipe: $type){\n   playlistType\n  }\n }\n"], ["\nmutation test($playlistID: ID!, $userID: ID!, $type: Boolean!){\n  updatePlaylistType(playlistID: $playlistID, userID: $userID, tipe: $type){\n   playlistType\n  }\n }\n"])));
var VideoPlaylistComponent = /** @class */ (function () {
    function VideoPlaylistComponent(apollo, route, router) {
        this.apollo = apollo;
        this.route = route;
        this.router = router;
        this.showSort = false;
    }
    VideoPlaylistComponent.prototype.ngOnInit = function () {
        this.playlistID = this.route.snapshot.paramMap.get('id');
        this.showUpdate = false;
        this.showDescription = false;
        this.showTitleUpdate = false;
        this.views = 0;
        this.playlistType = "Public";
        this.localuserID = localStorage.getItem('userID');
        this.getPlaylist();
        this.getPlaylistVideo();
    };
    VideoPlaylistComponent.prototype.getPlaylist = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrievePlaylist, variables: {
                playlistID: this.playlistID
            }
        }).valueChanges.subscribe(function (result) {
            _this.playlist = result.data.playlist;
            if (_this.playlist.playlistType) {
                _this.playlistType = "Public";
            }
            else {
                _this.playlistType = "Private";
            }
            _this.title = _this.playlist.playlistHeader;
            _this.desc = _this.playlist.description;
            _this.apollo.watchQuery({
                query: exports.retrieveUser, variables: {
                    userID: _this.playlist.userID
                }
            }).valueChanges.subscribe(function (result) {
                _this.user = result.data.userById;
                _this.playlistUser = _this.playlist.userID;
                _this.channelUserID = _this.user.id;
                _this.apollo.mutate({
                    mutation: exports.updateViews, variables: {
                        playlistID: _this.playlistID,
                        userID: _this.playlist.userID
                    }
                }).subscribe(function (result) {
                    _this.views = result.data['updatePlayListViews']['views'];
                    console.log(_this.views);
                    _this.getChannel();
                });
            });
        });
    };
    VideoPlaylistComponent.prototype.getPlaylistVideo = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrieveVideoPlaylist, variables: {
                playlistID: this.playlistID
            }
        }).valueChanges.subscribe(function (result) {
            _this.listVideo = result.data.playlistListVideos;
            _this.apollo.watchQuery({
                query: exports.retrieveVideo, variables: {
                    videoID: _this.listVideo[0].videoID
                }
            }).valueChanges.subscribe(function (result) { _this.thumbnail = result.data.Videos.thumbnail; });
        });
    };
    //=======================================================================
    VideoPlaylistComponent.prototype.showUpdateType = function () {
        if (this.showUpdate) {
            this.showUpdate = false;
        }
        else {
            this.showUpdate = true;
        }
    };
    VideoPlaylistComponent.prototype.showDescriptionUpdate = function () {
        if (this.showDescription) {
            this.showDescription = false;
        }
        else {
            this.showDescription = true;
        }
    };
    VideoPlaylistComponent.prototype.drop = function (event) {
        var logUserID = localStorage.getItem('userID');
        if (logUserID == this.playlist.userID) {
            var x = this.listVideo.slice();
            drag_drop_1.moveItemInArray(x, event.previousIndex, event.currentIndex);
            this.listVideo = x;
            this.updatePriorityWeight(event.previousIndex, event.currentIndex);
        }
    };
    VideoPlaylistComponent.prototype.updatePriorityWeight = function (previous, after) {
        var _this = this;
        console.log(this.playlistID, this.playlist.userID);
        this.apollo.mutate({
            mutation: exports.updatePriority, variables: {
                playlistID: this.playlistID,
                userID: this.playlist.userID,
                videoID: this.listVideo[after].videoID,
                prio: after + 1
            }
        }).subscribe(function (result) {
            _this.apollo.mutate({
                mutation: exports.updatePriority, variables: {
                    playlistID: _this.playlistID,
                    userID: _this.playlist.userID,
                    videoID: _this.listVideo[previous].videoID,
                    prio: previous + 1
                }
            }).subscribe();
        });
    };
    VideoPlaylistComponent.prototype.updateDesc = function () {
        var _this = this;
        var string = document.getElementById('description').value;
        this.apollo.mutate({
            mutation: exports.updateDescription, variables: {
                userID: this.playlist.userID,
                playlistID: this.playlistID,
                desc: string
            }
        }).subscribe(function (result) {
            _this.desc = result.data['updatePlayListDescription']['description'];
            alert('success');
        });
    };
    VideoPlaylistComponent.prototype.updateTitle = function () {
        var _this = this;
        var string = document.getElementById('input-title').value;
        this.apollo.mutate({
            mutation: exports.updateTitle, variables: {
                userID: this.playlist.userID,
                playlistID: this.playlistID,
                title: string
            }
        }).subscribe(function (result) {
            _this.title = result.data['updatePlayListHeader']['playlistHeader'];
            alert('success');
        });
    };
    VideoPlaylistComponent.prototype.updateType = function () {
        var _this = this;
        var ty = document.getElementById('type-choice').selectedIndex;
        var val = document.getElementById('type-choice').options[ty].value;
        var bol;
        if (val == "Private") {
            bol = false;
        }
        else {
            bol = true;
        }
        this.apollo.mutate({
            mutation: exports.updateType, variables: {
                userID: this.playlist.userID,
                playlistID: this.playlistID,
                type: bol
            }
        }).subscribe(function (result) {
            if (result.data['updatePlaylistType']['playlistType'] == true) {
                _this.playlistType = "Public";
            }
            else {
                _this.playlistType = "Private";
            }
            alert('success');
        });
    };
    VideoPlaylistComponent.prototype.showTitleUpdateVal = function () {
        if (this.showTitleUpdate) {
            this.showTitleUpdate = false;
        }
        else {
            this.showTitleUpdate = true;
        }
    };
    VideoPlaylistComponent.prototype.getChannel = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: video_play_component_1.retriveChannelSubs, variables: {
                userID: this.channelUserID
            }
        }).valueChanges.subscribe(function (result) {
            _this.channelID = result.data.getChannel.channelID;
            if (_this.user != null) {
                _this.userID = localStorage.getItem('userID');
                _this.apollo.mutate({
                    mutation: video_play_component_1.createSubsVal, variables: {
                        userID: _this.userID,
                        channelID: _this.channelID,
                        channelUserID: _this.channelUserID
                    }
                }).subscribe(function (result) {
                    _this.subscribe = result.data['createUserSubscribe']['subscribe'];
                    if (_this.subscribe) {
                        document.getElementById('button-subs').style.backgroundColor = "#D0CFCF";
                        document.getElementById('button-subs').style.color = "#565254";
                    }
                });
            }
        });
    };
    VideoPlaylistComponent.prototype.updateSubscribe = function () {
        var _this = this;
        this.apollo.mutate({
            mutation: channel_component_1.updateSubscribe, variables: {
                userID: this.userID,
                channelID: this.channelID
            }
        }).subscribe(function (result) {
            _this.subscribe = result.data['updateUserSubscribe']['subscribe'];
            if (_this.subscribe) {
                document.getElementById('button-subs').style.backgroundColor = "#D0CFCF";
                document.getElementById('button-subs').style.color = "#565254";
            }
            else {
                document.getElementById('button-subs').style.backgroundColor = "red";
                document.getElementById('button-subs').style.color = "white";
            }
            _this.apollo.mutate({
                mutation: channel_component_1.updateUserSubscribers, variables: {
                    userID: _this.channelUserID,
                    bool: _this.subscribe
                }
            }).subscribe(function (result) {
                _this.subscribers = result.data['updateSubscribers']['subscribers'];
            });
        });
    };
    VideoPlaylistComponent.prototype.navigate = function () {
        this.router.navigate(['/main/channel', this.playlistUser, 'home']);
    };
    VideoPlaylistComponent.prototype.showSortFunc = function () {
        if (this.showSort) {
            this.showSort = false;
        }
        else {
            this.showSort = true;
        }
    };
    VideoPlaylistComponent.prototype.sortByViews = function () {
        console.log(this.listVideo);
        this.listVideo = this.listVideo.slice().sort(function (a, b) { return (a.views > b.views) ? -1 : 1; });
        this.showSort = false;
        console.log(this.listVideo);
    };
    VideoPlaylistComponent.prototype.sortByAddToPlaylist = function () {
        this.listVideo = this.listVideo.slice().sort(function (a, b) { return (a.dateAddToPlaylist > b.dateAddToPlaylist) ? -1 : 1; });
        this.showSort = false;
    };
    VideoPlaylistComponent.prototype.sortByVideoPublish = function () {
        this.listVideo = this.listVideo.slice().sort(function (a, b) { return (a.datePublish > b.datePublish) ? -1 : 1; });
        this.showSort = false;
    };
    VideoPlaylistComponent = __decorate([
        core_1.Component({
            selector: 'app-video-playlist',
            templateUrl: './video-playlist.component.html',
            styleUrls: ['./video-playlist.component.sass']
        })
    ], VideoPlaylistComponent);
    return VideoPlaylistComponent;
}());
exports.VideoPlaylistComponent = VideoPlaylistComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
