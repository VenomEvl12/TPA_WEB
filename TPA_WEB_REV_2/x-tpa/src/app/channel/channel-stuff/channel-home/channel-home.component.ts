import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';

export const getLastVideos = gql
`
query getVideo($userID: ID!, $premium: Boolean!, $restriction: Boolean!){
	getLastVideos(userID: $userID, restriction: $restriction, premium: $premium){
    videoID
    title
    views
    day
    month
    year
    descriptions
    sourceLink
  }
}
`

export const getRandomVideos = gql
`
query getRandom($userID: ID!, $restriction: Boolean!, $premium: Boolean!){
  getFiveRandomVideos(userID: $userID, restriction: $restriction,premium: $premium){
    videoID
    user{
      id
      username
      thumbnail
    }
    title
    thumbnail
    views
    day
    month
    year
    descriptions
    sourceLink
  }
}
`

export const retrieveRandomPlaylist = gql
`
query retrievePlaylist($userID: ID!){
  playlistsRandom(userID: $userID){
    playlistID
    videoID
    playlistHeader
    totalVideo
  }
}
`

@Component({
  selector: 'app-channel-home',
  templateUrl: './channel-home.component.html',
  styleUrls: ['./channel-home.component.sass']
})
export class ChannelHomeComponent implements OnInit {

  channelUserID: any
  restriction: boolean
  premium: boolean

  user: any

  recentVideos: any

  videos: any

  playlists: any

  constructor(private apollo: Apollo, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.channelUserID = this.router.snapshot.parent.paramMap.get('id')
    this.premium = false
    this.restriction = true
    this.user = localStorage.getItem('user')
    if(this.user == null){
      this.premium = JSON.parse(localStorage.getItem('premium'))
      this.restriction = JSON.parse(localStorage.getItem('restriction'))
    }
    this.getRecentVideos()
    this.getRandomVideos()
  }

  getRecentVideos(): void{
    this.apollo.watchQuery<any>({
      query: getLastVideos, variables: {
        userID: this.channelUserID,
        restriction: this.restriction,
        premium: this.premium
      }
    }).valueChanges.subscribe(result => {
      this.recentVideos = result.data.getLastVideos
    })
  }

  getRandomVideos(): void {
    this.apollo.watchQuery<any>({
      query: getRandomVideos, variables: {
        userID: this.channelUserID,
        restriction: this.restriction,
        premium: this.premium
      }
    }).valueChanges.subscribe(result => { 
      this.videos = result.data.getFiveRandomVideos
      this.getRandomPlaylist()
     })
  }

  getRandomPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: retrieveRandomPlaylist, variables: {
        userID: this.channelUserID
      }
    }).valueChanges.subscribe(result => { this.playlists = result.data.playlistsRandom })
  }

  navigate(): void {
    this.route.navigate(['/main/channel', this.channelUserID, 'videos'])
  }
}
