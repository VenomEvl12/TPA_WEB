import { Component, OnInit, Input } from '@angular/core';
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { createSubsVal } from '../video-play/video-play.component';
import { updateSubscribe, updateUserSubscribers } from '../channel/channel.component';

export const retrieveChannel = gql
`
query getChannel($userID: ID!){
  getChannel(userID: $userID){
    channelDescription
    channelID
    videos{
      views
    }
  }
}
`

@Component({
  selector: 'app-search-channel-box',
  templateUrl: './search-channel-box.component.html',
  styleUrls: ['./search-channel-box.component.sass']
})
export class SearchChannelBoxComponent implements OnInit {

  @Input('user')user: any


  constructor(private apollo: Apollo, private route: Router) { }

  channel: any

  totalVideos: number
  userID: any
  channelID: any
  subscribe: boolean
  subscribers: number

  ngOnInit(): void {
    this.userID = localStorage.getItem('userID')
    this.subscribers = this.user.subscribers
    this.getChannel()
  }

  getChannel(): void {
    this.apollo.watchQuery<any>({
      query: retrieveChannel, variables: {
        userID: this.user.id
      }
    }).valueChanges.subscribe(result => { 
      this.channel = result.data.getChannel
      this.totalVideos = this.channel.videos.length
      this.channelID = this.channel.channelID
      if(this.userID != null){
        this.subscribeButton()
      }
    })
  }

  subscribeButton(): void {
    this.apollo.mutate({
      mutation: createSubsVal, variables: {
        userID: this.userID,
        channelID: this.channelID,
        channelUserID: this.user.id
      }
    }).subscribe(result => {
      this.subscribe = result.data['createUserSubscribe']['subscribe']
      if(this.subscribe){
        document.getElementById('button-subs').style.backgroundColor = "#D0CFCF"
        document.getElementById('button-subs').style.color = "#565254"
      }else{
        document.getElementById('button-subs').style.backgroundColor = "red"
        document.getElementById('button-subs').style.color = "white"
      }
    })
  }

  updateSubscribe(): void {
    if(this.userID == null){
      return
    }
    this.apollo.mutate({
      mutation: updateSubscribe, variables: {
        userID: this.userID,
        channelID: this.channelID
      }
    }).subscribe(result => {
      this.subscribe = result.data['updateUserSubscribe']['subscribe']
      if(this.subscribe){
        document.getElementById('button-subs').style.backgroundColor = "#D0CFCF"
        document.getElementById('button-subs').style.color = "#565254"
      }else{
        document.getElementById('button-subs').style.backgroundColor = "red"
        document.getElementById('button-subs').style.color = "white"
      }
      this.apollo.mutate({
        mutation: updateUserSubscribers, variables: {
          userID: this.user.id,
          bool: this.subscribe
        }
      }).subscribe(result => {
        this.subscribers = result.data['updateSubscribers']['subscribers']
      })
    })
  }

  navigate(): void {
    this.route.navigate(['/main/channel/', this.user.id, 'home'])
  }

}
