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
exports.VideoPlayComponent = exports.createSubsVal = exports.retriveChannelSubs = exports.createPlaylist = exports.insertVideoToPlaylist = exports.retrievePlaylist = exports.createReply = exports.videoDislikeValUpdate = exports.videoDislike = exports.videoLikeValUpdate = exports.videoLike = exports.getVideoLikeVal = exports.getVideosList = exports.updateViews = exports.getVideo = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var generateMonth_1 = require("../generateMonth");
var channel_component_1 = require("../channel/channel.component");
exports.getVideo = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query test2($video_id: ID!) {\n    Videos(videoID: $video_id){\n      videoID\n      sourceLink\n      title\n      views\n      day\n      month\n      year\n      like\n      dislike\n      descriptions\n      user{\n      \tid\n        thumbnail\n        subscribers\n        username\n      }\n  \tvideoReply{\n      user{\n        id\n        thumbnail\n        username\n      }\n      videoID\n      replyID\n      likes\n      day\n      month\n      year\n      dislikes\n      description\n      replyReplies{\n        replyRepliesID\n        replyID\n        day\n        month\n        year\n        user{\n          id\n          username\n          thumbnail\n        }\n        like\n        dislike\n        description\n      }\n    \t}\n    }\n  }\n"], ["\n  query test2($video_id: ID!) {\n    Videos(videoID: $video_id){\n      videoID\n      sourceLink\n      title\n      views\n      day\n      month\n      year\n      like\n      dislike\n      descriptions\n      user{\n      \tid\n        thumbnail\n        subscribers\n        username\n      }\n  \tvideoReply{\n      user{\n        id\n        thumbnail\n        username\n      }\n      videoID\n      replyID\n      likes\n      day\n      month\n      year\n      dislikes\n      description\n      replyReplies{\n        replyRepliesID\n        replyID\n        day\n        month\n        year\n        user{\n          id\n          username\n          thumbnail\n        }\n        like\n        dislike\n        description\n      }\n    \t}\n    }\n  }\n"])));
exports.updateViews = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation updateViews($videoID: ID!){\n    updateViews(VideoID: $videoID){\n      videoID\n    }\n  }\n"], ["\n  mutation updateViews($videoID: ID!){\n    updateViews(VideoID: $videoID){\n      videoID\n    }\n  }\n"])));
exports.getVideosList = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\nquery test3($location : String!, $restriction: Boolean!, $premium: Boolean!){\n  videoByLocation(location: $location, restriction: $restriction, premium: $premium){\n    videoID\n    title\n    thumbnail\n    day\n    month\n    year\n    views\n    user{\n      username\n      premium\n    }\n  }\n}\n"], ["\nquery test3($location : String!, $restriction: Boolean!, $premium: Boolean!){\n  videoByLocation(location: $location, restriction: $restriction, premium: $premium){\n    videoID\n    title\n    thumbnail\n    day\n    month\n    year\n    views\n    user{\n      username\n      premium\n    }\n  }\n}\n"])));
exports.getVideoLikeVal = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation createLikeVal($userID: ID!, $videoID: ID!){\n  createVideoLikeVali(input:{\n    userID: $userID\n    videoID: $videoID\n  }){\n    userID\n\t\tvideoID\n    like\n    dislike\n  }\n}\n"], ["\nmutation createLikeVal($userID: ID!, $videoID: ID!){\n  createVideoLikeVali(input:{\n    userID: $userID\n    videoID: $videoID\n  }){\n    userID\n\t\tvideoID\n    like\n    dislike\n  }\n}\n"])));
exports.videoLike = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  mutation likeVideo($VideoID: ID!, $likeVal: Boolean!){\n    updateLike(VideoID: $VideoID, likeVal: $likeVal){\n      videoID\n      like\n      dislike\n    }\n  }\n"], ["\n  mutation likeVideo($VideoID: ID!, $likeVal: Boolean!){\n    updateLike(VideoID: $VideoID, likeVal: $likeVal){\n      videoID\n      like\n      dislike\n    }\n  }\n"])));
exports.videoLikeValUpdate = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  mutation videoLikeValUpdate($videoID : ID!, $userID: ID!){\n    updateVideoLikeVali(videoID: $videoID, userID: $userID){\n      userID\n      videoID\n      like\n      dislike\n    }\n  }\n"], ["\n  mutation videoLikeValUpdate($videoID : ID!, $userID: ID!){\n    updateVideoLikeVali(videoID: $videoID, userID: $userID){\n      userID\n      videoID\n      like\n      dislike\n    }\n  }\n"])));
exports.videoDislike = graphql_tag_1["default"](templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  mutation likeVideo($VideoID: ID!, $likeVal: Boolean!){\n    updateDislike(VideoID: $VideoID, likeVal: $likeVal){\n      videoID\n      like\n      dislike\n    }\n  }\n"], ["\n  mutation likeVideo($VideoID: ID!, $likeVal: Boolean!){\n    updateDislike(VideoID: $VideoID, likeVal: $likeVal){\n      videoID\n      like\n      dislike\n    }\n  }\n"])));
exports.videoDislikeValUpdate = graphql_tag_1["default"](templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  mutation videoLikeValUpdate($videoID: ID!, $userID: ID!){\n    updateVideoDislikeVali(videoID: $videoID, userID: $userID){\n      userID\n      videoID\n      like\n      dislike\n    }\n  }\n"], ["\n  mutation videoLikeValUpdate($videoID: ID!, $userID: ID!){\n    updateVideoDislikeVali(videoID: $videoID, userID: $userID){\n      userID\n      videoID\n      like\n      dislike\n    }\n  }\n"])));
exports.createReply = graphql_tag_1["default"](templateObject_9 || (templateObject_9 = __makeTemplateObject(["\nmutation createReply($userID: ID!, $videoID: ID!, $day: Int!, $month: Int!, $year: Int!, $description: String!){\n  createVideoReply(input:{\n    userID: $userID\n    videoID: $videoID\n    day: $day\n    month: $month\n    year: $year\n    description: $description\n  }){\n    user{\n      id\n      thumbnail\n      username\n    }\n    replyID\n    likes\n    day\n    month\n    year\n    dislikes\n    description\n    replyReplies{\n      replyRepliesID\n      replyID\n      day\n      month\n      year\n      user{\n        id\n        username\n        thumbnail\n      }\n      like\n      dislike\n      description\n    }\n  }\n}\n"], ["\nmutation createReply($userID: ID!, $videoID: ID!, $day: Int!, $month: Int!, $year: Int!, $description: String!){\n  createVideoReply(input:{\n    userID: $userID\n    videoID: $videoID\n    day: $day\n    month: $month\n    year: $year\n    description: $description\n  }){\n    user{\n      id\n      thumbnail\n      username\n    }\n    replyID\n    likes\n    day\n    month\n    year\n    dislikes\n    description\n    replyReplies{\n      replyRepliesID\n      replyID\n      day\n      month\n      year\n      user{\n        id\n        username\n        thumbnail\n      }\n      like\n      dislike\n      description\n    }\n  }\n}\n"])));
exports.retrievePlaylist = graphql_tag_1["default"](templateObject_10 || (templateObject_10 = __makeTemplateObject(["\nquery getPlaylist($userID: ID!){\n  playlists(userID: $userID){\n    playlistID\n    playlistHeader\n  }\n}\n"], ["\nquery getPlaylist($userID: ID!){\n  playlists(userID: $userID){\n    playlistID\n    playlistHeader\n  }\n}\n"])));
exports.insertVideoToPlaylist = graphql_tag_1["default"](templateObject_11 || (templateObject_11 = __makeTemplateObject(["\nmutation insertToPlaylist($playlistID: ID!, $userID: ID!, $videoID: ID!){\n  inputVideoToPlayList(input:{\n    playlistID: $playlistID\n    userID: $userID\n    videoID: $videoID\n  }){\n    playlistID\n  }\n}\n"], ["\nmutation insertToPlaylist($playlistID: ID!, $userID: ID!, $videoID: ID!){\n  inputVideoToPlayList(input:{\n    playlistID: $playlistID\n    userID: $userID\n    videoID: $videoID\n  }){\n    playlistID\n  }\n}\n"])));
exports.createPlaylist = graphql_tag_1["default"](templateObject_12 || (templateObject_12 = __makeTemplateObject(["\nmutation insertToPlaylist($userID: ID!, $title: String!, $type: Boolean!, $desc: String!){\n  createPlaylist(input:{\n    userID: $userID\n    playlistHeader: $title\n    playlistType: $type\n    description: $desc\n  }){\n    playlistID\n  }\n}\n"], ["\nmutation insertToPlaylist($userID: ID!, $title: String!, $type: Boolean!, $desc: String!){\n  createPlaylist(input:{\n    userID: $userID\n    playlistHeader: $title\n    playlistType: $type\n    description: $desc\n  }){\n    playlistID\n  }\n}\n"])));
exports.retriveChannelSubs = graphql_tag_1["default"](templateObject_13 || (templateObject_13 = __makeTemplateObject(["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelID\n  }\n}\n"], ["\nquery getChannel($userID: ID!){\n  getChannel(userID: $userID){\n    channelID\n  }\n}\n"])));
exports.createSubsVal = graphql_tag_1["default"](templateObject_14 || (templateObject_14 = __makeTemplateObject(["\nmutation createSubs($userID: ID!, $channelID: ID!, $channelUserID: ID!){\n  createUserSubscribe(input:{\n    userID: $userID\n    channelID: $channelID\n    channelUserID: $channelUserID\n  }){\n    subscribe\n  }\n}\n"], ["\nmutation createSubs($userID: ID!, $channelID: ID!, $channelUserID: ID!){\n  createUserSubscribe(input:{\n    userID: $userID\n    channelID: $channelID\n    channelUserID: $channelUserID\n  }){\n    subscribe\n  }\n}\n"])));
var VideoPlayComponent = /** @class */ (function () {
    function VideoPlayComponent(apollo, route, router) {
        this.apollo = apollo;
        this.route = route;
        this.router = router;
        this.commentkey = 4;
        this.lastKey = 0;
        this.showPlaylistModal = false;
        this.showInputNewPlaylist = false;
        this.bools = false;
        this.showSort = false;
    }
    VideoPlayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userID = JSON.parse(localStorage.getItem('userID'));
        this.user = JSON.parse(localStorage.getItem('user'));
        this.lastKey = 16;
        this.showOption = false;
        if (this.user == null) {
            this.location = "Jepang";
            this.premium = false;
            this.restriction = true;
        }
        else {
            this.location = localStorage.getItem('location');
            this.premium = JSON.parse(localStorage.getItem('premium'));
            this.restriction = JSON.parse(localStorage.getItem('restriction'));
        }
        if (this.user != null) {
            this.thumbnail = this.user.photoUrl;
            this.getPlaylist();
        }
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.apollo.mutate({
            mutation: exports.updateViews, variables: {
                videoID: this.id
            }
        }).subscribe();
        this.apollo.watchQuery({
            query: exports.getVideo,
            variables: {
                video_id: this.id
            }
        }).valueChanges.subscribe(function (result) {
            _this.video = result.data.Videos;
            var monGen = new generateMonth_1.MonthCreator();
            _this.month = monGen.createMonth(_this.video.month);
            _this.date = _this.month.substring(0, 3) + " " + _this.video.day + ", " + _this.video.year;
            _this.replies = result.data.Videos.videoReply;
            _this.totalComment = _this.replies.length;
            _this.like = _this.video.like;
            _this.channelUserID = _this.video.user.id;
            _this.dislike = _this.video.dislike;
            _this.subscribers = _this.video.user.subscribers;
            _this.getChannel();
            _this.commentObserver = new IntersectionObserver(function (entry) {
                if (entry[0].isIntersecting) {
                    var card = document.querySelector(".card");
                    for (var i = 0; i < 4; i++) {
                        if (_this.commentkey < _this.replies.length) {
                            var div = document.createElement('div');
                            var vid = document.createElement('app-video-reply');
                            vid.setAttribute("comment", "this.replies[this.lastKey]");
                            div.appendChild(vid);
                            card.appendChild(div);
                            _this.commentkey++;
                        }
                    }
                }
            });
            _this.commentObserver.observe(document.querySelector('.footer'));
        });
        this.apollo.watchQuery({
            query: exports.getVideosList, variables: {
                location: this.location,
                restriction: this.restriction,
                premium: this.premium
            }
        }).valueChanges.subscribe(function (result) {
            _this.suggestion = result.data.videoByLocation;
            _this.obServer = new IntersectionObserver(function (entry) {
                if (entry[0].isIntersecting) {
                    var card = document.querySelector(".card");
                    for (var i = 0; i < 4; i++) {
                        if (_this.lastKey < _this.suggestion.length) {
                            var div = document.createElement('div');
                            var vid = document.createElement('app-video-play-list');
                            vid.setAttribute("suggetion", "this.suggetion[this.lastKey]");
                            div.appendChild(vid);
                            card.appendChild(div);
                            _this.lastKey++;
                        }
                    }
                }
            });
            _this.obServer.observe(document.querySelector('.footer'));
        });
        this.getLikeVal();
    };
    VideoPlayComponent.prototype.getLikeVal = function () {
        var _this = this;
        if (this.user == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.getVideoLikeVal, variables: {
                userID: this.userID,
                videoID: this.id
            }
        }).subscribe(function (result) {
            _this.likeVal = result.data['createVideoLikeVali'];
        });
    };
    VideoPlayComponent.prototype.getChannel = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retriveChannelSubs, variables: {
                userID: this.channelUserID
            }
        }).valueChanges.subscribe(function (result) {
            _this.channelID = result.data.getChannel.channelID;
            console.log(_this.userID, _this.channelID, _this.channelUserID);
            if (_this.user != null) {
                _this.apollo.mutate({
                    mutation: exports.createSubsVal, variables: {
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
    VideoPlayComponent.prototype.updateSubscribe = function () {
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
    // ------------------------------------------------------------------------------
    VideoPlayComponent.prototype.likeVideoVal = function () {
        var _this = this;
        if (this.user == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.videoLikeValUpdate, variables: {
                userID: this.userID,
                videoID: this.id
            }
        }).subscribe(function (result) {
            _this.likeVal = result.data['updateVideoLikeVali'];
            var vidLike = _this.likeVal.like;
            if (vidLike == false) {
                vidLike = true;
            }
            else {
                vidLike = false;
            }
            _this.apollo.mutate({
                mutation: exports.videoLike, variables: {
                    VideoID: _this.id,
                    likeVal: vidLike
                }
            }).subscribe(function (result) {
                _this.like = result.data['updateLike']['like'];
            });
        });
    };
    VideoPlayComponent.prototype.dislikeVideoVal = function () {
        var _this = this;
        if (this.user == null) {
            return;
        }
        this.apollo.mutate({
            mutation: exports.videoDislikeValUpdate, variables: {
                userID: this.userID,
                videoID: this.id
            }
        }).subscribe(function (result) {
            _this.likeVal = result.data['updateVideoDislikeVali'];
            var vidLike = _this.likeVal.dislike;
            if (vidLike == false) {
                vidLike = true;
            }
            else {
                vidLike = false;
            }
            _this.apollo.mutate({
                mutation: exports.videoDislike, variables: {
                    VideoID: _this.id,
                    likeVal: vidLike
                }
            }).subscribe(function (result) {
                _this.dislike = result.data['updateDislike']['dislike'];
            });
        });
    };
    VideoPlayComponent.prototype.createVideoReply = function () {
        var element = document.getElementById('input-rep');
        var inp = element.value;
        var date = new Date();
        if (inp != "") {
            this.apollo.mutate({
                mutation: exports.createReply, variables: {
                    userID: this.userID,
                    videoID: this.id,
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    description: inp
                }, refetchQueries: [{
                        query: exports.getVideo,
                        variables: {
                            video_id: this.id
                        }
                    }]
            }).subscribe(function (result) { return alert("insert Success"); });
        }
    };
    VideoPlayComponent.prototype.showOptionFunc = function () {
        if (this.showOption) {
            this.showOption = false;
        }
        else {
            this.showOption = true;
        }
    };
    VideoPlayComponent.prototype.showPlaylistModalFunc = function () {
        if (this.showPlaylistModal) {
            this.showPlaylistModal = false;
        }
        else {
            this.showPlaylistModal = true;
            this.showOption = false;
        }
    };
    VideoPlayComponent.prototype.getPlaylist = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.retrievePlaylist, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) {
            _this.playlists = result.data.playlists;
        });
    };
    VideoPlayComponent.prototype.inputToPlaylist = function (playlistID) {
        this.apollo.mutate({
            mutation: exports.insertVideoToPlaylist, variables: {
                userID: this.userID,
                videoID: this.route.snapshot.paramMap.get('id'),
                playlistID: playlistID
            }
        }).subscribe(function (result) { alert('success !'); });
    };
    VideoPlayComponent.prototype.showInputNewPlaylistFunc = function () {
        if (this.showInputNewPlaylist) {
            this.showInputNewPlaylist = false;
        }
        else {
            this.showInputNewPlaylist = true;
        }
    };
    VideoPlayComponent.prototype.createNewPlaylist = function () {
        var _this = this;
        var title = document.getElementById('p-title').value;
        var typeIdx = document.getElementById('p-type').selectedIndex;
        var bool;
        if (typeIdx == 0) {
            bool = true;
        }
        else {
            bool = false;
        }
        var desc = document.getElementById('p-desc').value;
        if (title == "" || desc == "") {
            return;
        }
        this.apollo.mutate({
            mutation: exports.createPlaylist, variables: {
                userID: this.userID,
                title: title,
                type: bool,
                desc: desc
            }
        }).subscribe(function (result) {
            alert('create Playlist Success !');
            var playlistID = result.data['createPlaylist']['playlistID'];
            console.log(playlistID);
            _this.inputToPlaylist(playlistID);
        });
    };
    VideoPlayComponent.prototype.hotkeys = function () {
        this.videox = document.getElementById('video-play');
        var audio_element = this.videox;
        this.bools = true;
        document.onkeydown = function (event) {
            switch (event.keyCode) {
                case 38:
                    event.preventDefault();
                    var audio_vol = (audio_element).volume;
                    if (audio_vol != 1) {
                        try {
                            var x = audio_vol + 0.02;
                            audio_element.volume = x;
                        }
                        catch (err) {
                            audio_element.volume = 1;
                        }
                    }
                    break;
                case 40:
                    event.preventDefault();
                    audio_vol = audio_element.volume;
                    if (audio_vol != 0) {
                        try {
                            var z = audio_vol - 0.02;
                            audio_element.volume = z;
                        }
                        catch (err) {
                            audio_element.volume = 0;
                        }
                    }
                    break;
                case 74:
                    event.preventDefault();
                    audio_element.currentTime -= 10;
                    break;
                case 75:
                    event.preventDefault();
                    audio_element.paused == false ? audio_element.pause() : audio_element.play();
                    break;
                case 76:
                    event.preventDefault();
                    audio_element.currentTime += 10;
                    break;
                case 70:
                    event.preventDefault();
                    if ((document.getElementById('video-play')).requestFullscreen) {
                        (document.getElementById('video-play')).requestFullscreen();
                    }
            }
        };
    };
    VideoPlayComponent.prototype.showSortFunc = function () {
        if (this.showSort) {
            this.showSort = false;
        }
        else {
            this.showSort = true;
        }
    };
    VideoPlayComponent.prototype.sortByLike = function () {
        this.replies = this.replies.slice().sort(function (a, b) { return (a.likes > b.likes) ? -1 : 1; });
    };
    VideoPlayComponent.prototype.sortByDate = function () {
        this.replies = this.replies.slice().sort(function (a, b) { return (a.year > b.year) ? -1 : 1; });
        this.replies = this.replies.slice().sort(function (a, b) { return (a.month > b.month) ? -1 : 1; });
        this.replies = this.replies.slice().sort(function (a, b) { return (a.day > b.day) ? -1 : 1; });
    };
    VideoPlayComponent.prototype.changePlayer = function () {
        var x = +this.video.videoID + 1;
        this.router.navigate(['/main/videoPlayer', this.video.videoID]);
        window.location.href = "/main/videoPlayer/" + x;
    };
    VideoPlayComponent = __decorate([
        core_1.Component({
            selector: 'app-video-play',
            templateUrl: './video-play.component.html',
            styleUrls: ['./video-play.component.sass']
        })
    ], VideoPlayComponent);
    return VideoPlayComponent;
}());
exports.VideoPlayComponent = VideoPlayComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
