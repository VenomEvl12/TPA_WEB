"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VideoPlayListComponent = void 0;
var core_1 = require("@angular/core");
var VideoPlayListComponent = /** @class */ (function () {
    function VideoPlayListComponent(appolo, router) {
        this.appolo = appolo;
        this.router = router;
    }
    VideoPlayListComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.month = (date.getMonth() + 1) - this.video.month;
    };
    VideoPlayListComponent.prototype.changePlayer = function () {
        this.router.navigate(['/main/videoPlayer', this.video.videoID]);
        window.location.href = "/main/videoPlayer/" + this.video.videoID;
    };
    __decorate([
        core_1.Input("suggestion")
    ], VideoPlayListComponent.prototype, "video");
    VideoPlayListComponent = __decorate([
        core_1.Component({
            selector: 'app-video-play-list',
            templateUrl: './video-play-list.component.html',
            styleUrls: ['./video-play-list.component.sass']
        })
    ], VideoPlayListComponent);
    return VideoPlayListComponent;
}());
exports.VideoPlayListComponent = VideoPlayListComponent;
