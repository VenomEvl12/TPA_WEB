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
exports.HeaderComponent = exports.getSuggestion = exports.getPlaylist = exports.mutatePlaylist = exports.updateRestriction = exports.updateLocation = exports.mutateUser = void 0;
var core_1 = require("@angular/core");
var angularx_social_login_1 = require("angularx-social-login");
var graphql_tag_1 = require("graphql-tag");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
exports.mutateUser = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation reply($email: String!, $username: String!, $thumbnail: String!, $location: String!) {\n    createUser(input:{\n      email: $email\n      username: $username\n      location: $location\n      thumbnail: $thumbnail\n    }){\n      id\n      location\n      restriction\n      premium\n    }\n  }\n"], ["\n  mutation reply($email: String!, $username: String!, $thumbnail: String!, $location: String!) {\n    createUser(input:{\n      email: $email\n      username: $username\n      location: $location\n      thumbnail: $thumbnail\n    }){\n      id\n      location\n      restriction\n      premium\n    }\n  }\n"])));
exports.updateLocation = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation updateLocation($id: ID!, $location: String!){\n    updateLocation(id: $id, location: $location){\n    id\n  }\n}\n"], ["\n  mutation updateLocation($id: ID!, $location: String!){\n    updateLocation(id: $id, location: $location){\n    id\n  }\n}\n"])));
exports.updateRestriction = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation updateRestriction($id: ID!, $restriction: Boolean!){\n    updateRestrictionUser(id: $id, restriction: $restriction){\n    id\n  }\n}\n"], ["\n  mutation updateRestriction($id: ID!, $restriction: Boolean!){\n    updateRestrictionUser(id: $id, restriction: $restriction){\n    id\n  }\n}\n"])));
exports.mutatePlaylist = graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["\nmutation createPlaylist($userID: ID!, $title: String!, $type: Boolean!, $description: String!){\n  createPlaylist(input:{\n    userID: $userID\n    playlistHeader: $title\n    playlistType: $type\n    description: $description\n  }){\n    playlistID\n  }\n}\n"], ["\nmutation createPlaylist($userID: ID!, $title: String!, $type: Boolean!, $description: String!){\n  createPlaylist(input:{\n    userID: $userID\n    playlistHeader: $title\n    playlistType: $type\n    description: $description\n  }){\n    playlistID\n  }\n}\n"])));
exports.getPlaylist = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["\nquery getPlaylist($userID: ID!){\n  playlists(userID: $userID){\n    playlistHeader\n    playlistID\n  }\n}\n"], ["\nquery getPlaylist($userID: ID!){\n  playlists(userID: $userID){\n    playlistHeader\n    playlistID\n  }\n}\n"])));
exports.getSuggestion = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["\nquery totalVideo($keyword: String!){\n  getVideoByKeywordTopFive(keyword: $keyword){\n    title\n  }\n}\n"], ["\nquery totalVideo($keyword: String!){\n  getVideoByKeywordTopFive(keyword: $keyword){\n    title\n  }\n}\n"])));
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, apollo, data, route) {
        var _this = this;
        this.authService = authService;
        this.apollo = apollo;
        this.data = data;
        this.route = route;
        this.searchColor$ = new rxjs_1.BehaviorSubject("");
        this.suggestion$ = this.searchColor$.pipe(operators_1.debounceTime(250), operators_1.switchMap(function (searchResultText) {
            return _this.apollo.watchQuery({
                query: exports.getSuggestion, variables: {
                    keyword: searchResultText
                }
            }).valueChanges.pipe(operators_1.map(function (_a) {
                var data = _a.data;
                return data.getVideoByKeywordTopFive;
            }));
        }), operators_1.map(function (suggestion) { return suggestion.map(function (result) { return result.title; }); }));
        this.suggestions = this.suggestion$;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.restrictMode = JSON.parse(localStorage.getItem('restriction'));
        this.loca = localStorage.getItem('location');
        this.keywordx = "";
        this.userID = localStorage.getItem('userID');
        this.boolCreatePlaylist = false;
        if (this.user == null) {
            this.restrictMode = true;
            this.loca = "Jepang";
        }
        else {
            this.getListPlaylist();
        }
    };
    HeaderComponent.prototype.signInWithGoogle = function () {
        var _this = this;
        this.authService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        this.authService.authState.subscribe(function (user) {
            _this.user = user;
            _this.loggedIn = (user != null);
            console.log(user.email, user.name, user.photoUrl);
            localStorage.setItem("user", JSON.stringify(_this.user));
            _this.apollo.mutate({
                mutation: exports.mutateUser, variables: {
                    email: user.email,
                    username: user.name,
                    location: "Indonesia",
                    thumbnail: user.photoUrl
                }
            }).subscribe(function (result) {
                _this.message = result.data["createUser"]["id"];
                _this.restrictMode = result.data["createUser"]["restriction"];
                _this.loca = result.data["createUser"]["location"];
                localStorage.setItem("userID", result.data["createUser"]["id"]);
                localStorage.setItem("restriction", result.data["createUser"]["restriction"]);
                localStorage.setItem("location", result.data["createUser"]["location"]);
                localStorage.setItem("premium", result.data["createUser"]["premium"]);
                _this.userID = localStorage.getItem('userID');
                _this.getListPlaylist();
                _this.data.changeMessage(_this.message);
            });
        });
    };
    HeaderComponent.prototype.getListPlaylist = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.getPlaylist, variables: {
                userID: this.userID
            }
        }).valueChanges.subscribe(function (result) { _this.playlist = result.data.playlists; });
    };
    HeaderComponent.prototype.updateLocation = function (loc) {
        this.apollo.mutate({
            mutation: exports.updateLocation, variables: {
                id: localStorage.getItem("userID"),
                location: loc
            }
        }).subscribe(function (result) {
            alert("location updated");
            localStorage.setItem("location", loc);
        });
    };
    HeaderComponent.prototype.updateRestricted = function () {
        var element = document.getElementById("modeRestrict");
        var bool = element.checked;
        this.apollo.mutate({
            mutation: exports.updateRestriction, variables: {
                id: localStorage.getItem("userID"),
                restriction: bool
            }
        }).subscribe(function (result) {
            alert("restriction updated !!");
            localStorage.setItem("restriction", JSON.stringify(bool));
        });
    };
    HeaderComponent.prototype.signInWithFB = function () {
        this.authService.signIn(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
    };
    HeaderComponent.prototype.signOut = function () {
        localStorage.clear();
        this.authService.signOut();
    };
    HeaderComponent.prototype.changeRoute = function (str) {
        this.route.navigate(['main/category', str]);
    };
    //---------------------------------------------------------------------------
    HeaderComponent.prototype.hide = function () {
        var element = document.getElementById('sidebar-hide');
        var element2 = document.getElementById('content-list');
        (element.style.display == 'block') ? element.style.display = 'none' : element.style.display = 'block';
        (element.style.display == 'block') ? element2.style.zIndex = '-1' : element2.style.zIndex = '0';
    };
    HeaderComponent.prototype.HideSetting = function () {
        var element = document.getElementById('setting');
        var element2 = document.getElementById('content-list');
        (element.style.display == 'block') ? element.style.display = 'none' : element.style.display = 'block';
        (element.style.display == 'block') ? element2.style.zIndex = '-1' : element2.style.zIndex = '0';
    };
    HeaderComponent.prototype.HideLocation = function () {
        var element = document.getElementById('setting-container-main');
        var element2 = document.getElementById('setting-container-location');
        if (element.style.display == 'block') {
            element.style.display = 'none';
            element2.style.display = 'block';
        }
        else {
            element.style.display = 'block';
            element2.style.display = 'none';
        }
    };
    HeaderComponent.prototype.HideShortcut = function () {
        var element = document.getElementById('shortcut');
        var element2 = document.getElementById('setting-container-main');
        if (element.style.display == 'block') {
            element.style.display = 'none';
            element2.style.display = 'block';
        }
        else {
            element.style.display = 'block';
            element2.style.display = 'none';
        }
    };
    HeaderComponent.prototype.HideRestricted = function () {
        var element = document.getElementById('setting-container-main');
        var element2 = document.getElementById('setting-container-restricted');
        if (element.style.display == 'block') {
            element.style.display = 'none';
            element2.style.display = 'block';
        }
        else {
            element.style.display = 'block';
            element2.style.display = 'none';
        }
    };
    HeaderComponent.prototype.HideSignOut = function () {
        var element = document.getElementById("user-sign-out");
        if (element.style.display == 'block') {
            element.style.display = 'none';
        }
        else {
            element.style.display = 'block';
        }
    };
    HeaderComponent.prototype.showCreatePlaylist = function () {
        if (this.boolCreatePlaylist) {
            this.boolCreatePlaylist = false;
        }
        else {
            this.boolCreatePlaylist = true;
        }
    };
    HeaderComponent.prototype.createPlayList = function () {
        var title = document.getElementById('playlist-header').value;
        var description = document.getElementById('playlist-desc').value;
        var accessElement = document.getElementById('playlist-access').selectedIndex;
        var access = document.getElementById('playlist-access').options[accessElement].value;
        var acc;
        if (access == "Public") {
            acc = true;
        }
        else {
            acc = false;
        }
        if (title != "" && description != "" && this.userID != null) {
            this.apollo.mutate({
                mutation: exports.mutatePlaylist, variables: {
                    userID: this.userID,
                    type: acc,
                    description: description,
                    title: title
                }
            }).subscribe(function (result) {
                alert("create Playlist Success !");
                window.location.reload();
            });
        }
    };
    HeaderComponent.prototype.moveToPlaylist = function (id) {
        this.route.navigate(['/main/playlist', id]);
    };
    HeaderComponent.prototype.toKeyword = function () {
        var _this = this;
        var keyword = document.getElementById('search-keyword').value;
        this.route.navigateByUrl('/', { skipLocationChange: true }).then(function () {
            _this.route.navigate(['/main/search/keyword', keyword]);
        });
    };
    HeaderComponent.prototype.doColorSearch = function (keyword) {
        this.keywordx = keyword;
        this.searchColor$.next(keyword);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.sass']
        }),
        core_1.Injectable()
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
