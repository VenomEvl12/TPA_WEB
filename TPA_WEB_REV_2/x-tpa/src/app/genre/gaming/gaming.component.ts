import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router'

export const getVideos = gql
`
query getVideo($category: String!, $restriction: Boolean!, $premium: Boolean!){
  videoByCategory(category: $category, restriction: $restriction, premium: $premium){
    videoID
    user{
      id
      username
      thumbnail
    }
    views
    title
    thumbnail
    day
    month
    year
    descriptions
    dislike
    like
    sourceLink
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
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.sass']
})
export class GamingComponent implements OnInit {

  constructor(private apollo: Apollo, private router: ActivatedRoute) { }

  videos : any
  videosShow: any=[]

  category: string

  pre: boolean
  res: boolean
  userID: any

  ngOnInit(): void {
    this.category = this.router.snapshot.paramMap.get('id')
    this.res = true
    this.pre = false
    if(localStorage.getItem('user') != null){
      this.res = JSON.parse(localStorage.getItem("restriction"))
      this.pre = JSON.parse(localStorage.getItem("premium"))
      this.userID = localStorage.getItem('userID')
    }
    this.apollo.watchQuery<any>({
      query: getVideos, variables: {
        category: this.category,
        restriction: this.res,
        premium: this.pre
      }
    }).valueChanges.subscribe(result => {
      this.videos = result.data.videoByCategory
      this.videosShow = this.videos
      if(this.userID != null){
        this.getPlaylist()
      }
    })
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
        break
      case 4:
        this.videosShow = this.videos
        break
    }
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

  showSort: boolean = false

  showSortFunc(): void {
    if(this.showSort){
      this.showSort = false
      return
    }
    this.showSort = true
  }
}
