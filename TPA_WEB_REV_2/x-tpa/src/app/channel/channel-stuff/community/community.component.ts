import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { ActivatedRoute } from '@angular/router';

export const getChannel = gql
`
query getChannel($userID: ID!){
  getChannel(userID: $userID){
    channelID
  }
}
`

export const getComment = gql
`
query getComment($channelID: ID!){
  channelCommunities(channelID: $channelID){
    communityID
    channelID
		comDescription
    like
    dislike
    day
    month
    year
    user{
      id
      username
      thumbnail
    }
  }
}
`

export const createCommunity = gql
`
mutation createCommunity($channelID: ID!, $userID: ID!, $day: Int!, $month: Int!, $year: Int!, $comDescription: String!){
  createChannelCommunities(input:{
    channelID: $channelID
    userID: $userID
    day: $day
    month: $month
    year: $year
    comDescription: $comDescription
  }){
    communityID
  }
}

`

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent implements OnInit {

  channelID: any
  userID: any
  localUserID: any

  comments: any
  thumbnail: any

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userID = this.route.snapshot.parent.paramMap.get('id')
    this.localUserID = localStorage.getItem("userID")
    this.getChannelId()

  }

  getChannelId(): void {
    this.apollo.watchQuery<any>({
      query: getChannel, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result =>{
      this.channelID = result.data.getChannel.channelID
      this.apollo.watchQuery<any>({
        query: getComment, variables: {
          channelID: this.channelID
        }
      }).valueChanges.subscribe(result => {
        this.comments = result.data.channelCommunities
        this.thumbnail = this.comments[0].user.thumbnail
      })
    })
  }

  createCommunity(): void {
    var element = document.getElementById('input-community')
    var val = (element as HTMLInputElement).value
    let date = new Date()
    if(val != ""){
      this.apollo.mutate({
        mutation: createCommunity, variables: {
          channelID: this.channelID,
          userID: this.userID,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          comDescription: val
        }, refetchQueries:[{
          query: getComment, variables: {
            channelID: this.channelID
          }
        }]
      }).subscribe(result => {
        alert("input comment success !")
      })
    }
  }
}
