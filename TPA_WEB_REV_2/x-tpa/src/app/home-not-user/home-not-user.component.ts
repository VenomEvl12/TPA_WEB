import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  animation,
  // ...
} from '@angular/animations';

export const getAVideos = gql`
  query getVideos($location: String!, $restriction: Boolean!, $premium : Boolean!){
    videoByLocation(location: $location, restriction: $restriction, premium: $premium){
      videoID
      user{
        id
        username
        thumbnail
        premium
      }
      title
      thumbnail
      views
      descriptions
      sourceLink
      videoLength
      day
      month
      year
    }
  }
`

@Component({
  selector: 'app-home-not-user',
  templateUrl: './home-not-user.component.html',
  styleUrls: ['./home-not-user.component.sass']
})

export class HomeNotUserComponent implements OnInit {

  loca: string
  restrictMode: boolean
  premium: boolean

  lastKey : number = 0
  obServer: any

  videos: any
  user: any

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"))
    this.restrictMode = JSON.parse(localStorage.getItem('restriction'))
    this.premium = JSON.parse(localStorage.getItem('premium'))
    this.loca = localStorage.getItem('location')
    if(this.user == null){
      this.restrictMode = true
      this.loca = "Jepang"
      this.premium = false
    }
    this.lastKey = 12
    this.getAllVideos()
  }

  getAllVideos(): void{
    this.apollo.watchQuery<any>({
      query: getAVideos, variables: {
        location: this.loca,
        restriction: this.restrictMode,
        premium: this.premium
      }
    }).valueChanges.subscribe(result => {
      this.videos = result.data.videoByLocation
      this.obServer = new IntersectionObserver((entry) => {
        if(entry[0].isIntersecting){
          let card = document.querySelector(".cardst")
          for(let i: number = 0; i < 4 ; i++){
            if(this.lastKey < this.videos.length){
              let div = document.createElement('span')
              let vid = document.createElement('app-video-box')
              vid.setAttribute("video", "this.videos[this.lastKey]")
              div.appendChild(vid)
              card.appendChild(div)
              this.lastKey++
            }
          }
        }
      })
      this.obServer.observe(document.querySelector('.footer'))
    })
  }


}
