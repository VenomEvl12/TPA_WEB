import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, ActivatedRoute } from '@angular/router';

export const getViews = gql
`
query totalViews($userID: ID!){
  videoTotalViews(userID: $userID)
}
`

export const getUser = gql
`
query getUser($id: ID!){
  userById(id: $id){
    date
  }
}
`

export const getChannel = gql
`
query getChannel($userID: ID!){
  getChannel(userID: $userID){
    channelID
    channelDescription
    location
  }
}
`

export const updateDescription = gql
`
mutation updateDescription($channelID: ID!, $description: String!){
  updateChannelDescription(channelID: $channelID, description: $description){
    channelDescription
  }
}
`

@Component({
  selector: 'app-channel-description',
  templateUrl: './channel-description.component.html',
  styleUrls: ['./channel-description.component.sass']
})
export class ChannelDescriptionComponent implements OnInit {

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  totalViews: number
  userID: any
  userIDlocal: any
  joinDate: any
  channel: any
  description: string

  showEdit: boolean

  ngOnInit(): void {
    this.userID = this.route.snapshot.parent.paramMap.get('id')
    this.userIDlocal = localStorage.getItem('userID')
    this.showEdit = false
    this.getTotalViews()
    this.getDate()
    this.getChannel()
  }

  getTotalViews(): void {
    this.apollo.watchQuery<any>({
      query: getViews, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => { 
      this.totalViews = result.data.videoTotalViews
    })
  }

  getDate(): void {
    this.apollo.watchQuery<any>({
      query: getUser, variables: {
        id: this.userID
      }
    }).valueChanges.subscribe(result => {this.joinDate = result.data.userById.date })
  }

  getChannel(): void {
    this.apollo.watchQuery<any>({
      query: getChannel, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
       this.channel = result.data.getChannel 
       this.description = this.channel.channelDescription
      })
  }

  updateDescription(): void {
    let channelDesc = (document.getElementById("inputDesc") as HTMLTextAreaElement).value
    this.apollo.mutate({
      mutation: updateDescription, variables: {
        channelID: this.channel.channelID,
        description: channelDesc
      }
    }).subscribe(result => {
      this.description = result.data['updateChannelDescription']['channelDescription']
      alert('update success !!')
      this.showEdit = false
    })
  }

  hideDescription(): void {
    console.log(this.showEdit)
    if(this.showEdit == false){
      this.showEdit = true
    }else{
      this.showEdit = false
    }
  }
}
