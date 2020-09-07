import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

export const getSubVal = gql
`
query getSubsVal($userID: ID!){
  getChannelSubscribe(userID: $userID){
    channelID
    subscribe
    channelUserID
  }
}
`

export const getVideos = gql
`
query getSubsVal($userID: ID!, $restriction: Boolean!, $premium: Boolean!){
  videoByUser(userID: $userID, restriction: $restriction, premium: $premium){
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
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.sass']
})
export class SubscriptionsComponent implements OnInit {

  userID: any
  restriction: boolean
  premium: boolean

  showSubs: boolean
  message: string

  listSubs: any

  videos: any=[]

  videosToday: any=[]
  videosWeek: any=[]
  videosYear: any=[]

  day: number
  month: number
  year: number

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    let date = new Date()
    this.day = date.getDate()
    this.month = date.getMonth()
    this.year = date.getFullYear()
    this.userID = localStorage.getItem('userID')
    this.restriction = JSON.parse(localStorage.getItem('restriction'))
    this.premium = JSON.parse(localStorage.getItem('premium'))
    this.showSubs = false
    if(this.userID == null){
      this.message = "Sign in"
    }else{
      this.getVideos()
    }
  }

  getVideos(): void {
    this.apollo.watchQuery<any>({
      query: getSubVal, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
      this.listSubs = result.data.getChannelSubscribe
      if(this.listSubs.length == 0){
        this.message = "Subscribe"
      }else{
        this.showSubs = true
        for(let i: number = 0; i < this.listSubs.length ; i++){
          console.log(this.listSubs[0].channelUserID)
          this.apollo.watchQuery<any>({
            query: getVideos, variables: {
              userID: this.listSubs[i].channelUserID,
              restriction: this.restriction,
              premium: this.premium
            }
          }).valueChanges.subscribe(result => {
            for(let i: number = 0 ; i < result.data.videoByUser.length ; i++){
              this.videos.push(result.data.videoByUser[i])
              if(result.data.videoByUser[i].day == this.day && result.data.videoByUser[i].month == this.month && result.data.videoByUser[i].year == this.year){
                this.videosToday.push(result.data.videoByUser[i])
              }else if(result.data.videoByUser[i].day > this.day - 8 && result.data.videoByUser[i].month == this.month && result.data.videoByUser[i].year == this.year){
                this.videosWeek.push(result.data.videoByUser[i])
              }else{
                this.videosYear.push(result.data.videoByUser[i])
              }
            }
          })
        }
      }
    })
  }
}
