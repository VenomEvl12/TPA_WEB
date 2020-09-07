import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { async } from 'rxjs/internal/scheduler/async';
import { debounceTime } from 'rxjs/operators';
import { retrievePlaylist } from '../video-play/video-play.component';

export const retrieveUser = gql
`
query getChannel($keyword: String!){
  getUserByKeyword(keyword: $keyword){
    id
    username
    subscribers
    thumbnail
    
  }
}
`

export const retrieveVideo = gql
`
query getChannel($keyword: String!){
  getVideoByKeyword(keyword: $keyword){
    videoID
    user{
      username
      thumbnail
      subscribers
    }
    title
    thumbnail
    views
    day
    month
    year
    descriptions
    sourceLink
    videoLength
  	}
}
`

export const retrievePlaylists = gql
`
query retrievePlaylistsByKeyword($keyword: String!){
  playlistsByKeyword(keyword: $keyword){
    playlistID
    userID
    videoID
    playlistHeader
    description
    totalVideo
  }
}
`

export const getPlaylist = gql
`
query getPlaylist($userID: ID!){
  playlists(userID: $userID){
    playlistID
    playlistHeader
  }
}
`


export const insertVideoToPlaylist = gql
`
mutation insertToPlaylist($playlistID: ID!, $userID: ID!, $videoID: ID!){
  inputVideoToPlayList(input:{
    playlistID: $playlistID
    userID: $userID
    videoID: $videoID
  }){
    playlistID
  }
}
`


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})
export class SearchPageComponent implements OnInit {

  constructor(private apollo: Apollo, private route: ActivatedRoute) { }

  keyword: string

  users: any
  videos: any
  videosShow: any=[]
  playlists: any
  userID: any


  suggestion: any

  ngOnInit(): void {
    this.keyword = this.route.snapshot.paramMap.get('id')
    this.userID = localStorage.getItem('userID')
    this.getUser()
    this.getVideos()
    this.getPlaylists()
  }

  getUser(): void {
    this.apollo.watchQuery<any>({
      query: retrieveUser, variables: {
        keyword: this.keyword
      }
    }).valueChanges.subscribe(result => {
      this.users = result.data.getUserByKeyword
    })
  }

  getVideos(): void {
    this.apollo.watchQuery<any>({
      query: retrieveVideo, variables: {
        keyword: this.keyword
      }
    }).valueChanges.subscribe(result => {
      this.videos = result.data.getVideoByKeyword
      this.videosShow = this.videos
    })
  }

  getPlaylists(): void {
    this.apollo.watchQuery<any>({
      query: retrievePlaylists, variables: {
        keyword: this.keyword
      }
    }).valueChanges.subscribe(result => {
      this.playlists = result.data.playlistsByKeyword
      this.getPlaylist()
    })
  }

  showPlaylist: boolean = true
  showChannel: boolean = true
  showVideo: boolean = true

  showPlaylistFunc(): void {
    this.showPlaylist = true
    this.showChannel = false
    this.showVideo = false
  }

  showChannelFunc(): void {
    this.showChannel = true
    this.showPlaylist = false
    this.showVideo = false
  }

  showVideoFunc(): void {
    this.showVideo = true
    this.showPlaylist = false
    this.showChannel = false
  }

  showAll(): void {
    this.showVideo = true
    this.showPlaylist = true
    this.showChannel = true
  }

  sortByDate(type: number): void {
    let date = new Date()
    this.videosShow = []
    switch(type){
      case 1:
        console.log('test')
        for( let i: number = 0 ; i < this.videos.length ; i++){
          if(this.videos[i].day >= 23){
            if(this.videos[i].day + 7 <= date.getDate())
            this.videosShow.push(this.videos[i])
          }else{
            if(this.videos[i].day + 7 >= date.getMonth() + 30){
              this.videosShow.push(this.videos[i])
            }
          }
        }
        break
      case 2:
        for( let i: number = 0 ; i < this.videos.length ; i++){
          if(this.videos[i].month == date.getMonth()){
            this.videosShow.push(this.videos[i])
          }
        }
        break
      case 3:
        for( let i: number = 0 ; i < this.videos.length ; i++){
          if(this.videos[i].year == date.getFullYear()){
            this.videosShow.push(this.videos[i])
          }
        }
    }
  }

  sortModal: boolean = false

  showSort(): void{
    if(this.sortModal){
      this.sortModal = false
      return
    }
    this.sortModal = true
  }

  userPlaylists: any

  getPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: getPlaylist, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
      this.userPlaylists = result.data.playlists
    })
  }

  inputToPlaylist(playlistID: number): void {
    this.apollo.mutate({
      mutation: insertVideoToPlaylist, variables: {
        userID: this.userID,
        videoID: this.tempVideoID,
        playlistID: playlistID
      }
    }).subscribe(result => { alert('success !')})
  }


  showPlaylistModal: boolean = false

  showModalFunc($event): void {
    if(this.userID == null){
      return
    }
    this.showPlaylistModal = $event
  }

  tempVideoID: any

  insertVideoIdFunc($event): void {
    this.tempVideoID = $event
  }

  showPlaylistModalFunc(): void {
    if(this.showPlaylistModal){
      this.showPlaylistModal = false
    }else{
      this.showPlaylistModal = true
    }
  }
}
