import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { getVideo } from '../video-play/video-play.component';
import { MonthCreator } from "../generateMonth"
import { Router } from '@angular/router';



@Component({
  selector: 'app-video-play-list',
  templateUrl: './video-play-list.component.html',
  styleUrls: ['./video-play-list.component.sass']
})
export class VideoPlayListComponent implements OnInit {

  constructor(private appolo: Apollo, private router: Router) { }

  @Input("suggestion") video : any

  month : number

  views: any

  ngOnInit(): void {
    var date = new Date()
    this.month = (date.getMonth() + 1) - this.video.month
    this.views = this.getformat(this.video.views)
  }

  changePlayer(): void {
    this.router.navigate(['/main/videoPlayer', this.video.videoID])
    window.location.href="/main/videoPlayer/" + this.video.videoID
  }

  getformat(view: number){
    let number = view
    if(number == 0) {
    return 0;
    }   
    else
    {        
      // hundreds
      if(number <= 999){
        return number ;
      }
      // thousands
      else if(number >= 1000 && number <= 999999){
        
        return Math.floor((number / 1000)) + 'K';
      }
      // millions
      else if(number >= 1000000 && number <= 999999999){
        return Math.floor((number / 1000000)) + 'M';
      }
      // billions
      else if(number >= 1000000000 && number <= 999999999999){
        return Math.floor((number / 1000000000)) + 'B';
      }
      else
        return number ;
      }
    }

}
