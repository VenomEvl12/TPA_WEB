import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'

export const getVideoSort = gql
`
  query getVideosSort($restriction: Boolean!, $premium: Boolean!){
    videoByLocationSort(restriction: $restriction, premium: $premium){
      videoID
      user{
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
      videoLength
    }
  }
`

export const retrievePlaylist = gql
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
  selector: 'app-trending-list',
  templateUrl: './trending-list.component.html',
  styleUrls: ['./trending-list.component.sass']
})
export class TrendingListComponent implements OnInit {

  constructor(private router: Router, private apollo: Apollo) { }

  videos: any

  res: boolean
  pre: boolean
  userID: any

  playlists: any

  ngOnInit(): void {
    this.res = true
    this.pre = false
    if(localStorage.getItem('user') != null){
      this.res = JSON.parse(localStorage.getItem("restriction"))
      this.pre = JSON.parse(localStorage.getItem("premium"))
      this.userID = localStorage.getItem('userID')
    }
    this.apollo.watchQuery<any>({
      query: getVideoSort, variables: {
        restriction: this.res,
        premium: this.pre
      }
    }).valueChanges.subscribe(result => {
      this.videos = result.data.videoByLocationSort
      this.getPlaylist()
    })
  }

  getPlaylist(): void {
    this.apollo.watchQuery<any>({
      query: retrievePlaylist, variables: {
        userID: this.userID
      }
    }).valueChanges.subscribe(result => {
      this.playlists = result.data.playlists
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

  onSelect(str): void{
    this.router.navigate(['/main/category', str])
  }

  showPlaylistModal: boolean = false

  showModalFunc($event): void {
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
